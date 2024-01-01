import React, { memo, useState, forwardRef, useImperativeHandle, Ref } from 'react'
import { Upload } from 'antd'
import type { RcFile } from 'antd/es/upload/interface'
interface IChildMethods {
  setImageUrl: (img: string) => void
}
interface IProps {
  getImgFile?: (val: any) => any
}
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const UploadImg: React.ForwardRefRenderFunction<IChildMethods, IProps> = ({ getImgFile }, ref) => {
  const [imageUrl, setImageUrl] = useState<string>()
  function handleAction({ file }: any) {
    getBase64(file as RcFile, (url) => {
      setImageUrl(url)
    })
    if (getImgFile) getImgFile(file)
  }

  useImperativeHandle(ref as Ref<IChildMethods>, () => ({
    setImageUrl
  }))
  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={handleAction}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </>
  )
}

export default forwardRef(UploadImg)
