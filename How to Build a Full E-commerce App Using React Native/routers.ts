import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ==================== CATEGORIES ====================
  categories: router({
    list: publicProcedure.query(() => db.getCategories()),
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => db.getCategoryBySlug(input.slug)),
  }),

  // ==================== PRODUCTS ====================
  products: router({
    list: publicProcedure
      .input(
        z.object({
          limit: z.number().optional(),
          offset: z.number().optional(),
        })
      )
      .query(({ input }) => db.getProducts(input.limit, input.offset)),

    byCategory: publicProcedure
      .input(
        z.object({
          categoryId: z.number(),
          limit: z.number().optional(),
          offset: z.number().optional(),
        })
      )
      .query(({ input }) =>
        db.getProductsByCategory(input.categoryId, input.limit, input.offset)
      ),

    byId: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getProductById(input.id)),

    featured: publicProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(({ input }) => db.getFeaturedProducts(input.limit || 10)),
  }),

  // ==================== CART ====================
  cart: router({
    list: protectedProcedure.query(({ ctx }) =>
      db.getCartItems(ctx.user.id)
    ),

    add: protectedProcedure
      .input(
        z.object({
          productId: z.number(),
          quantity: z.number().default(1),
        })
      )
      .mutation(({ ctx, input }) =>
        db.addToCart(ctx.user.id, input.productId, input.quantity)
      ),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          quantity: z.number(),
        })
      )
      .mutation(({ input }) => db.updateCartItem(input.id, input.quantity)),

    remove: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => db.removeFromCart(input.id)),

    clear: protectedProcedure.mutation(({ ctx }) =>
      db.clearCart(ctx.user.id)
    ),
  }),

  // ==================== WISHLIST ====================
  wishlist: router({
    list: protectedProcedure.query(({ ctx }) =>
      db.getWishlistItems(ctx.user.id)
    ),

    add: protectedProcedure
      .input(z.object({ productId: z.number() }))
      .mutation(({ ctx, input }) =>
        db.addToWishlist(ctx.user.id, input.productId)
      ),

    remove: protectedProcedure
      .input(z.object({ productId: z.number() }))
      .mutation(({ ctx, input }) =>
        db.removeFromWishlist(ctx.user.id, input.productId)
      ),
  }),

  // ==================== ADDRESSES ====================
  addresses: router({
    list: protectedProcedure.query(({ ctx }) =>
      db.getUserAddresses(ctx.user.id)
    ),

    add: protectedProcedure
      .input(
        z.object({
          type: z.enum(["home", "work", "other"]),
          fullName: z.string(),
          phoneNumber: z.string(),
          addressLine1: z.string(),
          addressLine2: z.string().optional(),
          city: z.string(),
          state: z.string(),
          postalCode: z.string(),
          isDefault: z.boolean().optional(),
        })
      )
      .mutation(({ ctx, input }) =>
        db.addAddress({ ...input, userId: ctx.user.id })
      ),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          type: z.enum(["home", "work", "other"]).optional(),
          fullName: z.string().optional(),
          phoneNumber: z.string().optional(),
          addressLine1: z.string().optional(),
          addressLine2: z.string().optional(),
          city: z.string().optional(),
          state: z.string().optional(),
          postalCode: z.string().optional(),
          isDefault: z.boolean().optional(),
        })
      )
      .mutation(({ input }) => {
        const { id, ...data } = input;
        return db.updateAddress(id, data);
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => db.deleteAddress(input.id)),
  }),

  // ==================== ORDERS ====================
  orders: router({
    list: protectedProcedure.query(({ ctx }) =>
      db.getUserOrders(ctx.user.id)
    ),

    byId: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getOrderById(input.id)),

    create: protectedProcedure
      .input(
        z.object({
          addressId: z.number(),
          subtotal: z.number(),
          discountAmount: z.number().optional(),
          deliveryCharge: z.number().optional(),
          totalAmount: z.number(),
          paymentMethod: z.enum([
            "credit_card",
            "debit_card",
            "upi",
            "wallet",
            "cod",
          ]),
          couponCode: z.string().optional(),
          notes: z.string().optional(),
        })
      )
      .mutation(({ ctx, input }) => {
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        return db.createOrder({
          ...input,
          userId: ctx.user.id,
          orderNumber,
          paymentStatus: "pending",
          status: "pending",
        });
      }),

    updateStatus: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum([
            "pending",
            "confirmed",
            "processing",
            "shipped",
            "delivered",
            "cancelled",
          ]),
        })
      )
      .mutation(({ input }) =>
        db.updateOrderStatus(input.id, input.status)
      ),

    updatePaymentStatus: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          paymentStatus: z.enum(["pending", "completed", "failed"]),
          paymentId: z.string().optional(),
        })
      )
      .mutation(({ input }) =>
        db.updatePaymentStatus(
          input.id,
          input.paymentStatus,
          input.paymentId
        )
      ),
  }),

  // ==================== ORDER ITEMS ====================
  orderItems: router({
    byOrderId: protectedProcedure
      .input(z.object({ orderId: z.number() }))
      .query(({ input }) => db.getOrderItems(input.orderId)),

    create: protectedProcedure
      .input(
        z.object({
          orderId: z.number(),
          productId: z.number(),
          productName: z.string(),
          productImage: z.string().optional(),
          quantity: z.number(),
          price: z.number(),
        })
      )
      .mutation(({ input }) => db.createOrderItem(input)),
  }),

  // ==================== REVIEWS ====================
  reviews: router({
    byProductId: publicProcedure
      .input(z.object({ productId: z.number() }))
      .query(({ input }) => db.getProductReviews(input.productId)),

    create: protectedProcedure
      .input(
        z.object({
          productId: z.number(),
          rating: z.number().min(1).max(5),
          title: z.string().optional(),
          comment: z.string().optional(),
        })
      )
      .mutation(({ ctx, input }) =>
        db.createReview({
          ...input,
          userId: ctx.user.id,
          isVerified: false,
        })
      ),
  }),

  // ==================== COUPONS ====================
  coupons: router({
    validate: publicProcedure
      .input(
        z.object({
          code: z.string(),
          orderAmount: z.number(),
        })
      )
      .query(({ input }) =>
        db.validateCoupon(input.code, input.orderAmount)
      ),
  }),

  // ==================== BANNERS ====================
  banners: router({
    list: publicProcedure.query(() => db.getActiveBanners()),
  }),
});

export type AppRouter = typeof appRouter;
