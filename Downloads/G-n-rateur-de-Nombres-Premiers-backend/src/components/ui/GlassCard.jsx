function GlassCard({
  icon,
  title,
  description,
  className = '',
  ...props
}) {
  return (
    <div
      className="
        relative z-[101]
        backdrop-blur-xl
        border border-white/30
        rounded-3xl
        p-6
        h-full
        flex flex-col
        transition-all duration-300
        hover:bg-white/10 hover:border-white/40 hover:shadow-2xl hover:scale-[1.02]
      "
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        transform: 'translateZ(0)',
        willChange: 'transform',
        isolation: 'isolate',
      }}
      {...props}
    >
      {title && (
        <h3 className="text-xl font-semibold text-white mb-3 text-center">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-white/90 text-sm leading-relaxed text-center flex-grow">
          {description}
        </p>
      )}
    </div>
  )
}

export default GlassCard
