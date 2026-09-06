import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { z } from "zod";
import { useAuthStore } from "../../stores/authStore";

const loginSchema = z.object({
  email: z.string().email("Introduce un email válido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const { signIn, loading, error, clearError } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginForm) => {
    clearError();
    await signIn(data.email, data.password);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-8 pt-20 pb-8">
          {/* Logo */}
          <View className="items-center mb-10">
            <View className="w-16 h-16 rounded-2xl bg-primary items-center justify-content mb-3">
              <Text className="text-4xl">🌿</Text>
            </View>
            <Text className="text-xs font-bold text-primary tracking-widest">
              FOCUSPAL
            </Text>
          </View>

          {/* Título */}
          <Text className="text-3xl font-bold text-text-primary mb-2">
            Bienvenido de nuevo
          </Text>
          <Text className="text-text-secondary mb-8">
            Continúa tu camino hacia el enfoque
          </Text>

          {/* Error global */}
          {error && (
            <View className="bg-danger-light border border-danger-border rounded-2xl p-4 mb-4">
              <Text className="text-danger text-sm">{error}</Text>
            </View>
          )}

          {/* Email */}
          <Text className="text-xs font-semibold text-text-secondary mb-2 tracking-wide">
            EMAIL
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                className={`bg-surface border rounded-2xl px-4 py-4 text-text-primary mb-1
                  ${errors.email ? "border-danger" : "border-border"}`}
                placeholder="tu@email.com"
                placeholderTextColor="#8AAE80"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.email && (
            <Text className="text-danger text-xs mb-3">
              {errors.email.message}
            </Text>
          )}

          {/* Password */}
          <Text className="text-xs font-semibold text-text-secondary mb-2 mt-3 tracking-wide">
            CONTRASEÑA
          </Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                className={`bg-surface border rounded-2xl px-4 py-4 text-text-primary mb-1
                  ${errors.password ? "border-danger" : "border-border"}`}
                placeholder="••••••••"
                placeholderTextColor="#8AAE80"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.password && (
            <Text className="text-danger text-xs mb-3">
              {errors.password.message}
            </Text>
          )}

          {/* Botón login */}
          <TouchableOpacity
            className="bg-primary rounded-2xl py-5 items-center mt-6"
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-base">
                Iniciar sesión
              </Text>
            )}
          </TouchableOpacity>

          {/* Link a registro */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-text-secondary">¿No tienes cuenta? </Text>
            <Link href="/(auth)/register">
              <Text className="text-primary font-bold">Regístrate gratis</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
