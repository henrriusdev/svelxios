"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSvelteKit = void 0;
const fs_1 = __importDefault(require("fs"));
function isSvelteKit() {
    if (!fs_1.default.existsSync('package.json'))
        return false;
    const packageJson = JSON.parse(fs_1.default.readFileSync('package.json', 'utf8'));
    return packageJson.dependencies && packageJson.dependencies['@sveltejs/kit'];
}
exports.isSvelteKit = isSvelteKit;
