import {transform} from "@babel/standalone";

export const TransformModule = async () => ({
    transform: async (code: string) =>{
        return transform(code, {
            plugins: [],
            presets: ["react"],
          }).code;
    }
});