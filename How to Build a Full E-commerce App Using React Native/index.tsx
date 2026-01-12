import { ScrollView, Text, View, Pressable, FlatList, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";
import { trpc } from "@/lib/trpc";
import { useAuthContext } from "@/lib/auth-context";
import { Image } from "expo-image";

const CATEGORY_ICONS: Record<string, string> = {
  groceries: "🛒",
  kids: "👶",
  clothes: "👕",
  books: "📚",
  electronics: "📱",
  home: "🏠",
  beauty: "💄",
  sports: "⚽",
};

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const { data: categories, isLoading: categoriesLoading } = trpc.categories.list.useQuery();
  const { data: featuredProducts, isLoading: productsLoading } = trpc.products.featured.useQuery({ limit: 10 });

  const handleCategoryPress = (slug: string) => {
    router.push({ pathname: "/(tabs)/products", params: { category: slug } });
  };

  const handleProductPress = (productId: number) => {
    router.push({ pathname: "/(tabs)/product-detail", params: { id: productId.toString() } });
  };

  const handleLoginPress = () => {
    router.push("/(tabs)/profile");
  };

  const formatPrice = (priceInPaise: number) => {
    const priceInRupees = priceInPaise / 100;
    return `₹${priceInRupees.toFixed(2)}`;
  };

  const getDiscountedPrice = (price: number, discountPercentage: number) => {
    return price * (1 - discountPercentage / 100);
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="px-4 py-4 bg-primary">
          <Text className="text-2xl font-bold text-white mb-2">JioMart</Text>
          <Text className="text-sm text-white opacity-90">Your trusted online grocery store</Text>
        </View>

        {/* Search Bar */}
        <Pressable
          onPress={() => router.push("/(tabs)/products")}
          className="mx-4 mt-4 bg-surface rounded-full px-4 py-3 flex-row items-center border border-border"
        >
          <Text className="text-muted text-base flex-1">🔍 Search products...</Text>
        </Pressable>

        {/* Categories Section */}
        <View className="mt-6 px-4">
          <Text className="text-lg font-bold text-foreground mb-3">Categories</Text>
          {categoriesLoading ? (
            <ActivityIndicator size="large" color="#0a7ea4" />
          ) : (
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id.toString()}
              numColumns={4}
              scrollEnabled={false}
              columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 12 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleCategoryPress(item.slug)}
                  className="flex-1 items-center mx-1"
                >
                  <View className="w-16 h-16 bg-surface rounded-full items-center justify-center mb-2 border border-border">
                    <Text className="text-3xl">{CATEGORY_ICONS[item.slug] || "📦"}</Text>
                  </View>
                  <Text className="text-xs text-foreground text-center font-medium">{item.name}</Text>
                </Pressable>
              )}
            />
          )}
        </View>

        {/* Featured Products Section */}
        <View className="mt-8 px-4 pb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-foreground">Featured Products</Text>
            <Pressable onPress={() => router.push("/(tabs)/products")}>
              <Text className="text-primary text-sm font-semibold">See All</Text>
            </Pressable>
          </View>

          {productsLoading ? (
            <ActivityIndicator size="large" color="#0a7ea4" />
          ) : (
            <FlatList
              data={featuredProducts}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleProductPress(item.id)}
                  className="flex-1 bg-surface rounded-lg overflow-hidden mr-2 border border-border"
                >
                  <View className="w-full h-32 bg-gray-200">
                    {item.imageUrl && (
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={{ width: "100%", height: "100%" }}
                        contentFit="cover"
                      />
                    )}
                  </View>
                  <View className="p-3">
                    <Text className="text-sm font-semibold text-foreground truncate">{item.name}</Text>
                    <View className="flex-row items-center mt-1 mb-2">
                      <Text className="text-xs text-muted">⭐ {item.rating || 0}</Text>
                    </View>
                    <View className="flex-row items-baseline gap-1">
                      {(item.discountPercentage || 0) > 0 && (
                        <Text className="text-xs text-muted line-through">
                          {formatPrice(item.originalPrice || item.price)}
                        </Text>
                      )}
                      <Text className="text-sm font-bold text-primary">
                        {formatPrice(getDiscountedPrice(item.price, item.discountPercentage || 0))}
                      </Text>
                    </View>
                    {(item.discountPercentage || 0) > 0 && (
                      <Text className="text-xs text-success font-semibold mt-1">
                        {item.discountPercentage}% OFF
                      </Text>
                    )}
                  </View>
                </Pressable>
              )}
            />
          )}
        </View>

        {/* Login Prompt */}
        {!isAuthenticated && (
          <View className="mx-4 mb-6 bg-primary rounded-lg p-4">
            <Text className="text-white font-semibold mb-2">Sign in to your account</Text>
            <Text className="text-white text-sm mb-3">Get personalized recommendations and track your orders</Text>
            <Pressable
              onPress={handleLoginPress}
              className="bg-white rounded-lg py-2 px-4 items-center"
            >
              <Text className="text-primary font-semibold">Login / Sign Up</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
