import { useDouyin } from '@renderer/store/douyin/hooks'

type UserInfo = {
  name: string
  avatar: string
  followers: number
}

function User({ followers, name, avatar }: UserInfo) {
  return (
    <div className="p-2 flex flex-row gap-2 items-center">
      <div className="relative avatar">
        <div className="w-24 rounded-full">
          <img src={avatar} alt="" />
        </div>
        <div className="absolute">
          <span className="loading loading-ring loading-ring-lg text-green-500"></span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-[20px] text-white">{name}</div>
        <div className="text-[22px] text-white/90">{`${followers / 10000}万`}</div>
      </div>
    </div>
  )
}

function App() {
  const { dyhCount, dfzxCount, countdown } = useDouyin()

  return (
    <div
      style={{
        backgroundSize: '100% 100%',
        backgroundPosition: '0 0,100% 0',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'linear-gradient(90deg,rgba(26,28,39,0) 0%,#1a1c27 calc(100% - 852px),rgba(32,32,53,.35) 64.63%,rgba(33,33,57,.2) 100%),url(//lf3-cdn-tos.bytegoofy.com/obj/goofy/ies/douyin_web/media/dark_bg_default.51564fca60b7a3da.png)'
      }}
      className="h-screen"
    >
      <div className="fixed left-1/2 -translate-x-1/2 w-[375px] h-[70%] p-5 flex flex-col justify-center gap-3">
        {/*<div className="text-[22px] text-red-500/90">见证董宇辉粉丝2000万</div>*/}
        <User
          name="董宇辉"
          followers={dyhCount}
          avatar="https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_61ef8a9a0458c96eb5ff0afa94bab7fb~c5_300x300.jpeg?from=2956013662"
        />
        <User
          name="东方甄选"
          followers={dfzxCount}
          avatar="https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_34583dc5dc55d5983f8a57fafcbceb6d~c5_300x300.jpeg?from=2956013662"
        />
        <div className="text-white/50 pl-10">
          自动刷新(<span className="text-white/30 text-sm">倒计时{countdown}秒</span>)
        </div>
      </div>
    </div>
  )
}

export default App
