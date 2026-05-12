const SkeletonCard = () => {

  return (

    <div
        
        className="
          relative
          overflow-hidden
          rounded-2xl
          bg-white dark:bg-[#0F172A]
          shadow-lg
          border border-gray-100
        "
      >

        {/* Shimmer Overlay */}

        <div className="
          absolute inset-0
          -translate-x-full
          animate-[shimmer_2s_infinite]
          bg-gradient-to-r
          from-transparent
          via-white/60
          to-transparent
          z-10
        "></div>

        {/* Image */}

        <div className="
          h-52
          bg-gradient-to-r
          from-gray-200
          via-gray-100
          to-gray-200
          animate-pulse
        "></div>

        {/* Content */}

        <div className="p-5">

          <div className="
            h-6
            rounded-md
            bg-gray-200
            animate-pulse
            mb-4
            w-[90%]
          "></div>

          <div className="
            h-4
            rounded-md
            bg-gray-200
            animate-pulse
            mb-2
          "></div>

          <div className="
            h-4
            rounded-md
            bg-gray-200
            animate-pulse
            mb-2
            w-[95%]
          "></div>

          <div className="
            h-4
            rounded-md
            bg-gray-200
            animate-pulse
            w-[70%]
          "></div>

          {/* Footer */}

          <div className="
            flex
            justify-between
            items-center
            mt-6
          ">

            <div className="
              h-4
              w-24
              rounded-md
              bg-gray-200
              animate-pulse
            "></div>

            <div className="
              h-10
              w-28
              rounded-xl
              bg-gradient-to-r
              from-blue-200
              to-blue-100
              animate-pulse
            "></div>

          </div>

        </div>

      </div>

  )
}

export default SkeletonCard;