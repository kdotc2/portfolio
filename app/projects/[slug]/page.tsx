import { Projects, allProjects } from 'contentlayer/generated'
import { Mdx, MDXComponents } from '@components/Mdx/MDXComponents'
import { TableOfContents } from '@components/Mdx/Toc'
import { getTableOfContents } from '@lib/remark-toc-headings'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { notFound } from 'next/navigation'

export const generateStaticParams = async () => allProjects.map((post) => ({ slug: post.slug }))
export const generateMetadata = ({ params }: { params: Projects }) => {
  const post = allProjects.find((post) => post.slug === params.slug)
  if (!post) {
    return
  }
  const { title, summary: description, image, slug } = post
  const ogImage = image

  return {
    description,
    openGraph: {
      description,
      images: [
        {
          url: ogImage,
        },
      ],
      title,
      url: `/projects/${slug}`,
    },
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      images: [ogImage],
      title,
    },
  }
}

export default async function ProjectLayout({ params }: { params: { slug: string } }) {
  const post = allProjects.find((post) => post.slug === params.slug)
  if (!post) {
    notFound()
  }

  const toc = await getTableOfContents(post.body.raw)

  return (
    <div className="relative flex pb-16 pt-10">
      <div>
        <div className="space-y-2 pb-10 pt-4">
          <a target="_blank" rel="noopener noreferrer" href={post.url} className="inline-block">
            <span className="flex items-center gap-2 text-2xl font-bold hover:underline">
              {post.title}
              <ArrowUpRightIcon className="h-4 w-4" />
            </span>
          </a>
          <p className="text-gray-500 dark:text-gray-400">{post.description}</p>
        </div>
        <div className="prose max-w-5xl dark:prose-dark">
          <Mdx content={post} MDXComponents={MDXComponents} />
        </div>
      </div>
      <div className="hidden max-w-[200px] text-sm 2xl:block">
        <div className="sticky top-10 flex">
          <TableOfContents toc={toc} />
        </div>
      </div>
    </div>
  )
}
