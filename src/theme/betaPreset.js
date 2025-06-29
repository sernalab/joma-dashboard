import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';

export default definePreset(Aura, {
    semantic: {
        // Cambiar el color primario a naranja
        primary: {
            50: '{orange.50}',
            100: '{orange.100}',
            200: '{orange.200}',
            300: '{orange.300}',
            400: '{orange.400}',
            500: '{orange.500}',
            600: '{orange.600}',
            700: '{orange.700}',
            800: '{orange.800}',
            900: '{orange.900}',
            950: '{orange.950}'
        },
        // Colores específicos para modo claro y oscuro
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{gray.50}',
                    100: '{gray.100}',
                    200: '{gray.200}',
                    300: '{gray.300}',
                    400: '{gray.400}',
                    500: '{gray.500}',
                    600: '{gray.600}',
                    700: '{gray.700}',
                    800: '{gray.800}',
                    900: '{gray.900}',
                    950: '{gray.950}'
                }
            },
            dark: {
                surface: {
                    0: '#1e293b',
                    50: '{slate.950}',
                    100: '{slate.900}',
                    200: '{slate.800}',
                    300: '{slate.700}',
                    400: '{slate.600}',
                    500: '{slate.500}',
                    600: '{slate.400}',
                    700: '{slate.300}',
                    800: '{slate.200}',
                    900: '{slate.100}',
                    950: '{slate.50}'
                }
            }
        },
        // Asegurar buen contraste en elementos de formulario
        formField: {
            focusBorderColor: '{primary.color}'
        },
        // Color de enfoque
        focusRing: {
            color: '{primary.color}',
            shadow: '0 0 0 0.2rem {orange.200}'
        }
    }
});