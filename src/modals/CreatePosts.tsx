import React, { useEffect, useState } from 'react'
import Modal from '@/comp/Modal'
import { Button } from '@/components/ui/button'
import { useAppDispatch } from '@/store'
import { setModals } from '@/store/Modals/modals.slice'
import { RootReduxState } from '@/store/redux.types'
import { useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { BiImages } from 'react-icons/bi'
import { Textarea } from '@/components/ui/textarea'

export const CreatePosts = () => {
  const [file, setFile] = useState<File[]>([])
  const [image, setImage] = useState<string>()
  const dispatch = useAppDispatch()
  const { createPost } = useSelector((state: RootReduxState) => state.modalsSlice)
  const onClose = () => {
    dispatch(setModals({ createPost: false }))
    setFile([])
    setImage('')
  }
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: acceptedFiles => {
      setFile(acceptedFiles)
    },
    maxSize: 1024 * 1024 * 10,
    multiple: false,
    accept: {
      'image/jpeg': ['.jpeg', '.png']
    }
  })

  const handleOnImageChange = () => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]
      const reader = new FileReader()
      reader.onload = () => {
        setImage(String(reader.result))
      }
      reader.readAsDataURL(selectedFile)
    }
  }
  useEffect(() => {
    setImage('')
    handleOnImageChange()
  }, [acceptedFiles])

  return (
    <Modal hideClose isOpen={createPost} onClose={onClose}>
      <div className="w-full flex justify-between">
        <div className="font-semibold">Create New Post</div>
        <div className="flex gap-3">
          <Button>Next</Button>
          <Button variant={'secondary'} onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
      {file.length !== 0 && (
        <Textarea className="mt-3" placeholder="Enter the description for the post." />
      )}
      <div className="min-w-[80%] h-[400px] relative mt-4" {...getRootProps()}>
        {file.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full">
            <input {...getInputProps()} />
            <BiImages fontSize={80} />
            <p className="mt-2">Drag or upload photos here</p>
          </div>
        ) : (
          <>
            <Image src={image!} alt="post-image" fill />
          </>
        )}
      </div>
    </Modal>
  )
}
