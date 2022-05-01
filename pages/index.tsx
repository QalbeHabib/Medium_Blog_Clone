import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { sanityClient, urlFor } from '../sanity'
import dynamic from 'next/dynamic'
import Header from '../Components/Header/Header'
import { Post } from '../Typings'
import Link from 'next/link'
import { getAllPost } from '../SanityQuery'

interface Props {
  posts: [Post]
}

const Home = ({ posts }: Props) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className=" flex items-center justify-around border-2 border-y-black bg-yellow-400 py-10 px-10">
        <div className="space-y-5 ">
          <h1 className=" max-w-xl font-serif text-4xl md:text-5xl lg:text-6xl ">
            <span className="underline decoration-black decoration-4">
              MEDIUM
            </span>{' '}
            is a place to write, read and connect together
          </h1>
          <p className="max-w-lg text-lg">
            It's easy and free to post your thinking on any topic and connect
            with millions of readers
          </p>
          <button className="rounded-full bg-black px-4 py-2 text-white shadow-lg">
            Start Reading
          </button>
        </div>
        <div className=" hidden font-serif  md:inline-flex md:text-[200px] lg:text-[250px] ">
          M
        </div>
      </div>
      {/* Posts here */}
      <div className="grid grid-cols-1 gap-5 p-5 transition sm:grid-cols-2 md:gap-6 md:p-5 lg:grid-cols-3 lg:gap-8 lg:p-8  ">
        {posts.map((post) => (
          // <Link >
          //   <img src={urlFor(post.mainImage).url()!} alt="" />
          // </Link>
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group cursor-pointer rounded-md shadow-md  ">
              <img
                className="h-56 w-full rounded-t-md object-cover  transition-transform  duration-300 group-hover:scale-[1.02]"
                src={urlFor(post.mainImage).url()!}
                alt="Article"
              />

              <div className="flex h-48 flex-col justify-between p-6 ">
                <div>
                  <a
                    href="#"
                    className="text- mt-2 block transform text-2xl font-semibold transition duration-200"
                  >
                    {post.title}
                  </a>
                  <p className=" text-sm text-gray-800 ">{post.description}</p>
                </div>

                <div className="mt-auto">
                  <div className=" flex items-center justify-between">
                    <div className="flex items-center  ">
                      <img
                        className="h-5 w-5 rounded-lg object-cover"
                        src={urlFor(post.author.image).url()!}
                        alt="Avatar"
                      />
                      <a href="#" className="mx-2 font-semibold text-gray-700 ">
                        {post.author.name}
                      </a>
                    </div>
                    <span className="mx-1 text-xs text-gray-600 ">
                      {post.releasedate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const posts = await sanityClient.fetch(getAllPost)

  return {
    props: {
      posts,
    },
  }
}
