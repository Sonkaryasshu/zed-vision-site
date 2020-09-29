import { transform } from "@babel/standalone";

export const TransformModule = () => ({
  transform: (code: string) => {
    return transform(code, {
      plugins: [],
      presets: ["react", ["typescript", { isTSX: true, allExtensions: true }]],
    }).code;
  },
});
