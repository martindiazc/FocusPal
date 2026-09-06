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

const registerSchema = z
  .object({
    nombre: z.string().min(2, "Mínimo 2 caracteres"),
    email: z.string().email("Introduce un email válido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Las contraseñas no coinciden",
    path: ["confirm"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const { signUp, loading, error, clearError } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { nombre: "", email: "", password: "", confirm: "" },
  });

  const onSubmit = async (data: RegisterForm) => {
    clearError();
    await signUp(data.email, data.password, data.nombre);
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
        <View className="flex-1 px-8 pt-16 pb-8">
          {/* Logo */}
          <View className="items-center mb-8">
            <View className="w-16 h-16 rounded-2xl bg-primary items-center justify-center mb-3">
              <Text className="text-4xl">🌿</Text>
            </View>
            <Text className="text-xs font-bold text-primary tracking-widest">
              FOCUSPAL
            </Text>
          </View>

          <Text className="text-3xl font-bold text-text-primary mb-2">
            Crea tu cuenta
          </Text>
          <Text className="text-text-secondary mb-6">
            Empieza gratis, sin tarjeta de crédito
          </Text>

          {/* Error global */}
          {error && (
            <View className="bg-danger-light border border-danger-border rounded-2xl p-4 mb-4">
              <Text className="text-danger text-sm">{error}</Text>
            </View>
          )}

          {/* Nombre */}
          <Text className="text-xs font-semibold text-text-secondary mb-2 tracking-wide">
            NOMBRE
          </Text>
          <Controller
            control={control}
            name="nombre"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                className={`bg-surface border rounded-2xl px-4 py-4 text-text-primary mb-1
                  ${errors.nombre ? "border-danger" : "border-border"}`}
                placeholder="Tu nombre"
                placeholderTextColor="#8AAE80"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.nombre && (
            <Text className="text-danger text-xs mb-2">
              {errors.nombre.message}
            </Text>
          )}

          {/* Email */}
          <Text className="text-xs font-semibold text-text-secondary mb-2 mt-3 tracking-wide">
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
            <Text className="text-danger text-xs mb-2">
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
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor="#8AAE80"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.password && (
            <Text className="text-danger text-xs mb-2">
              {errors.password.message}
            </Text>
          )}

          {/* Confirmar password */}
          <Text className="text-xs font-semibold text-text-secondary mb-2 mt-3 tracking-wide">
            CONFIRMAR CONTRASEÑA
          </Text>
          <Controller
            control={control}
            name="confirm"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                className={`bg-surface border rounded-2xl px-4 py-4 text-text-primary mb-1
                  ${errors.confirm ? "border-danger" : "border-border"}`}
                placeholder="Repite la contraseña"
                placeholderTextColor="#8AAE80"
                secureTextEntry
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.confirm && (
            <Text className="text-danger text-xs mb-2">
              {errors.confirm.message}
            </Text>
          )}

          {/* Botón registro */}
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
                Crear cuenta gratis
              </Text>
            )}
          </TouchableOpacity>

          {/* Link a login */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-text-secondary">¿Ya tienes cuenta? </Text>
            <Link href="/(auth)/login">
              <Text className="text-primary font-bold">Inicia sesión</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
