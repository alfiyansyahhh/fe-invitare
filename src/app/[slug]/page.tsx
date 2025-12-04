'use client';
import { getTemplateComponent } from '@/lib/utils';
import { notFound } from 'next/navigation';

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const raw = typeof window !== 'undefined' && localStorage.getItem(slug);

  if (!raw) return notFound();

  const data = JSON.parse(raw);

  const Template = getTemplateComponent(data.template);

  return (
    <Template
      heroData={data.heroData}
      galleryImages={data.galleryImages}
      initialGuests={data.guests}
    />
  );
}
