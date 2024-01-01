// 将URL图片转换为File对象
async function urlToBlob(url: string) {
  const response = await fetch(url)
  const blob = await response.blob()
  return blob
}

// 创建File对象
function blobToFile(blob: any, fileName: string) {
  const file = new File([blob], fileName, { type: blob.type })
  return file
}

// 使用示例
export function getImageFileFromUrl(url: string, fileName: string) {
  return new Promise((resolve, reject) => {
    urlToBlob(url)
      .then((blob) => {
        const file = blobToFile(blob, fileName)
        resolve(file)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  })
}
