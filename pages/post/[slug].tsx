import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'
import PortableText from 'react-portable-text'
import Header from '../../Components/Header/Header'
import { sanityClient, urlFor } from '../../sanity'
import { getPostByID, getPostBySlug } from '../../SanityQuery'
import { Post } from '../../Typings'
interface Props {
  post: Post
}

interface InputForm {
  _id: string
  name: string
  email: string
  message: string
}
const Post = ({ post }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>();

  const onSubmit = async (data: InputForm) => {
    await fetch('/api/CommentSection',{
      method:'POST',
      body:JSON.stringify(data)
    }).then(()=>{
      alert('Your comment has been sent successfully')
    }).catch(()=>{
      alert('Something went wrong')
    }
    )
  }
  return (
    <div>
      <Header />

      <img
        alt="blog image"
        src={urlFor(post.mainImage).url()!}
        className="h-[200px] md:h-[400px] w-full"
      />

      <div className="mx-auto mt-10 max-w-4xl ">
        <article className="m-5">
          <h1 className="text-lg font-bold">{post.title}</h1>
          <h2 className="mb-3 text-sm">{post.description}</h2>
          <div className="flex items-start  md:items-center">
            <Image
              className="rounded-full "
              width={30}
              height={30}
              src={urlFor(post.author.image).url()!}
              // layout="fill"
              alt="avatar"
            />

            <h2 className="ml-2">
              Blog post by :{' '}
              <span className="text-yellow-500">{post.author.name}</span>{' '}
              Published at : {new Date(post._createdAt).toLocaleString()}
            </h2>
          </div>

          {post.body && (
            <PortableText
              className=""
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1 className="text-2xl font-bold" {...props} />
                ),
                h2: (props: any) => (
                  <h1 className="my-5 text-xl font-bold" {...props} />
                ),
                h3: (props: any) => (
                  <h1 className="my-4 text-lg font-bold" {...props} />
                ),
                h4: (props: any) => (
                  <h1 className="text-md my-3 font-bold" {...props} />
                ),
                link: ({ href, children }: any) => (
                  <a
                    href={href}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    {children}
                  </a>
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                normal: (props: any) => <p className="my-5" {...props} />,
              }}
            />
          )}
        </article>

        <div>
          <h2 className="m-5 text-2xl font-bold">Comments</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="body-font relative m-5 text-gray-600">
              <div className="container mx-auto text-left">
                <div className="mb-12 flex w-full flex-col text-left ">
                  <p className="mx-auto text-left text-base leading-relaxed lg:w-2/3">
                    Leave A Comment, Hope you like the article.
                  </p>
                </div>
                <div className="mx-auto max-w-4xl">
                  <div className="-m-2 flex flex-wrap items-start  justify-start">
                    <div className="w-full p-2 md:w-1/2">
                      <input
                        type="hidden"
                        {...register('_id')}
                        name="_id"
                        value={post._id}
                      />
                      <div className="relative">
                        <label
                          htmlFor="name"
                          className="text-sm leading-7 text-gray-600"
                        >
                          Name
                        </label>
                        <input
                          {...register('name', { required: true })}
                          type="text"
                          id="name"
                          name="name"
                          className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200"
                        />
                      </div>
                    </div>
                    <div className="w-full p-2 md:w-1/2">
                      <div className="relative">
                        <label
                          htmlFor="email"
                          className="text-sm leading-7 text-gray-600"
                        >
                          Email
                        </label>
                        <input
                          {...register('email', { required: true })}
                          type="email"
                          id="email"
                          name="email"
                          className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200"
                        />
                      </div>
                    </div>
                    <div className="w-full p-2">
                      <div className="relative">
                        <label
                          htmlFor="message"
                          className="text-sm leading-7 text-gray-600"
                        >
                          Message
                        </label>
                        <textarea
                         {...register('message', { required: true })}
                          id="message"
                          name="message"
                          className="h-32 w-full resize-none rounded border border-gray-300 bg-gray-100 bg-opacity-50 py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200"
                        ></textarea>
                      </div>
                    </div>
                    <div>
                      {errors.name && (
                        <p className="text-xs italic text-red-500">
                          - Name is required
                        </p>
                      )}
                      {errors.email && (
                        <p className="text-xs italic text-red-500">
                          - Email is required
                        </p>
                      )}
                      {errors.message && (
                        <p className="text-xs italic text-red-500">
                          - Message is required
                        </p>
                      )}
                    </div>
                    <div className="flex w-full justify-end p-2">
                      <button className=" rounded border-0 bg-yellow-500 py-2 px-8 text-lg text-white hover:bg-yellow-600 focus:outline-none">
                        Send Now
                      </button>
                    </div>
                    <div className="mt-8 w-full border-t border-gray-200 p-2 pt-8 text-center">
                      <a className="text-yellow-500">rana.habib313@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = []
  try {
    const posts = await sanityClient.fetch(getPostByID)
    const path = posts.map((post: Post) => ({
      params: {
        slug: post.slug.current,
      },
    }))
    paths = path
    // console.log(paths)
  } catch (error) {
    console.log(error)
  }
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await sanityClient.fetch(getPostBySlug, {
    slug: params?.slug,
  })

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
