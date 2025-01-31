/* eslint-disable react/display-name */
import React from 'react'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import { coreContent } from 'lib/utils/contentlayer'
import type { Writing, Work, Misc, Projects } from 'contentlayer/generated'
import Image from './Image'
import CustomLink from './Link'
import Pre from './Pre'
import Button from './Button'
import VideoPlayer from './VideoPlayer'
import Bookmarks from '@/components/layouts/BookmarksLayout'
import { cn } from '@/lib/utils'

interface MDXLayout {
  content: Writing | Work | Misc | Projects
  [key: string]: unknown
}

const headerClass =
  (Component: React.ElementType) =>
  ({ className, ...props }: { className: string }) =>
    <Component className={cn('scroll-mt-20', className)} {...props} />

export const MDXComponents: object = {
  h1: headerClass('h1'),
  h2: headerClass('h2'),
  h3: headerClass('h3'),
  h4: headerClass('h4'),
  h5: headerClass('h5'),
  h6: headerClass('h6'),
  Image,
  a: CustomLink,
  pre: Pre,
  Button,
  VideoPlayer,
  Bookmarks,
}

export const Mdx = ({ content, ...rest }: MDXLayout) => {
  const MDXLayout = useMDXComponent(content.body.code)
  const mainContent = coreContent(content)

  return (
    <MDXLayout
      content={mainContent}
      components={{ ...MDXComponents }}
      {...rest}
    />
  )
}
