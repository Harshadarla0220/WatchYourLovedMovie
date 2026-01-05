"use client"

import { useRouter } from "next/navigation"
import MovieDetail from "@/components/movie-detail"

interface MovieDetailWrapperProps {
  movieId: number
}

export default function MovieDetailWrapper({ movieId }: MovieDetailWrapperProps) {
  const router = useRouter()

  return <MovieDetail movieId={movieId} onBack={() => router.push("/movies")} />
}
