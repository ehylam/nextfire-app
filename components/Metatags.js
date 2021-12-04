import Head from 'next/head';

export  default function Metatags({ title, description, image }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@ehylam" />
    </Head>
  )
}