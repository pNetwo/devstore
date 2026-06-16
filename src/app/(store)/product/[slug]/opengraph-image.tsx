import { api } from "@/src/data/api";
import { Product } from "@/src/data/types/products";
import { env } from "@/src/env";
import { ImageResponse } from "next/og";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function getProducts(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60,
    },
  });

  const product = await response.json();

  return product;
}

// Image generation
export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProducts(slug);

  const productImageURL = new URL(product.image, env.APP_URL).toString();

  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        background: "#09090b",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <img src={productImageURL} alt="" style={{ width: "100%" }} />
    </div>,
  );
}
