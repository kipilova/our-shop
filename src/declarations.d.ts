// src/declarations.d.ts
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}
