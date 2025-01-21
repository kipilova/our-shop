// vite-env.d.ts или global.d.ts
declare global {
  interface Window {
    ym: any; // Указываем тип `any`, так как точный тип будет зависеть от данных, которые метрика передает.
  }
}

export {};
