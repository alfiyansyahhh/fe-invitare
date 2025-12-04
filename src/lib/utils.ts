import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dynamic from 'next/dynamic';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const templates: Record<string, any> = {
  template1: dynamic(() => import('@/components/templates/tempalte1')),
  // template2: dynamic(() => import("@/components/templates/template2")),
  // template3: dynamic(() => import("@/components/templates/template3")),
};

export function getTemplateComponent(template: string) {
  return templates[template] || templates['template1'];
}

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
}
