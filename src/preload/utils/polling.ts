import { dfzx } from './dfzx'
import { dyh } from './dyh'

let dfzxCount = 0
let dyhCount = 0
let countdown = 0
let timer: NodeJS.Timeout

export async function polling(callback: (count: Douyin) => void) {
  try {
    const count = await dyh()
    if (count > 0) dyhCount = count
  } catch (e) {
    console.error('getDyh', e)
  }

  try {
    const count = await dfzx()
    if (count > 0) dfzxCount = count
  } catch (e) {
    console.error('getDyh', e)
  }

  countdown = Math.floor(Math.random() * 26) + 5 // 随机生成5到30之间的整数

  clearInterval(timer)
  timer = setInterval(() => {
    callback({
      dyhCount,
      dfzxCount,
      countdown: countdown--
    })
  }, 1000)
  setTimeout(() => polling(callback), countdown * 1000)
}
