import React from 'react'

export const StudioLogo = (props: any) => {
  const {renderDefault} = props

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
      <img
        src="https://zugkwxy0oqkvrsu5.public.blob.vercel-storage.com/Digitalvint.png"
        alt="Digital Vint Logo"
        style={{
          width: '25px',
          height: '25px',
          objectFit: 'contain',
          filter: 'brightness(0) invert(1)', // Ensures it looks good on Sanity's dark theme
        }}
      />
      <div style={{fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em'}}>
        Digital<span style={{color: '#0082f3'}}>vint</span>
      </div>
    </div>
  )
}
