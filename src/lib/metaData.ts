import { CustomSeoProps } from '@/components/Seo'

interface MetaData extends CustomSeoProps {
  title: string
  description: string
  keywords: Array<string>
  slug: string
  og_image: string
  og_image_alt: string
  type?: 'website' | 'blog'
}

export const getMetaData = (data: MetaData): CustomSeoProps => ({
  canonical: 'https://nuwszy.vercel.app/' + data.slug,
  openGraph: {
    images: [
      {
        url: data.og_image,
        alt: data.og_image_alt,
        width: 1200,
        height: 600
      }
    ],
    site_name: 'Nuwszy',
    url: 'https://nuwszy.vercel.app/' + data.slug,
    type: data.type ?? 'website'
  },
  twitter: {
    cardType: 'summary_large_image',
    // TODO: Change to your Tiwetter username
    site: 'nuwszy',
    handle: 'nuwszy'
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: data.keywords.join(', ')
    }
  ],
  ...data
})
