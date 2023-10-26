'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

const CreatePost = () => {
  const ref = useRef<HTMLDialogElement>(null)
  const router = useRouter()
  const search = useSearchParams()
  const isOpen = search.get('create-post')

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        router.replace('/')
      }
    }
    document.addEventListener('click', checkIfClickedOutside)
    return () => {
      document.removeEventListener('click', checkIfClickedOutside)
    }
  }, [])
  return (
    <dialog ref={ref} id="my_modal_1" className="modal z-20" open={!!isOpen}>
      <div className="modal-box bg-white">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={() => router.replace('/')}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
export default CreatePost
