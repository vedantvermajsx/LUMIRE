import { useState, useRef, useCallback } from 'react';
import { Ic, S } from './AdminCommon';

export default function ImageDropzone({ images = [], onImagesChange }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const processFiles = useCallback((files) => {
    Array.from(files).filter(f => f.type.startsWith('image/')).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => onImagesChange(prev => [...prev, {
        id: Date.now() + Math.random(),
        file, preview: e.target.result,
        name: file.name, status: 'pending', cloudinaryUrl: null,
      }]);
      reader.readAsDataURL(file);
    });
  }, [onImagesChange]);

  const removeImage = (id) => onImagesChange(prev => prev.filter(img => img.id !== id));
  const setPrimary  = (id) => onImagesChange(prev => {
    const idx = prev.findIndex(i => i.id === id);
    if (idx === 0) return prev;
    const next = [...prev]; const [item] = next.splice(idx, 1); next.unshift(item); return next;
  });

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
      <label style={S.label}>
        Collection Images
        <span style={{ fontWeight:300, letterSpacing:'normal', textTransform:'none', marginLeft:'6px', color:'rgba(212,175,55,0.2)', fontSize:'8px' }}>
          · first = primary
        </span>
      </label>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); processFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        style={{
          border:`1px dashed ${dragging ? 'rgba(212,175,55,0.5)' : 'rgba(212,175,55,0.15)'}`,
          background: dragging ? 'rgba(212,175,55,0.04)' : 'rgba(212,175,55,0.01)',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          gap:'8px', padding:'28px 20px', cursor:'pointer', transition:'all 0.3s',
        }}
      >
        <div style={{ color: dragging ? 'rgba(212,175,55,0.55)' : 'rgba(212,175,55,0.25)', transform: dragging ? 'scale(1.1)' : 'scale(1)', transition:'all 0.3s' }}>
          <Ic.upload />
        </div>
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'10px', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(245,245,245,0.2)', fontWeight:300 }}>
          {dragging ? 'Release to add' : 'Drop images or click to browse'}
        </p>
        <input ref={inputRef} type="file" multiple accept="image/*" style={{ display:'none' }} onChange={e => processFiles(e.target.files)} />
      </div>

      {/* Thumbnail grid */}
      {images.length > 0 && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:'6px' }}>
          {images.map((img, idx) => (
            <div key={img.id} className="group" style={{ position:'relative', aspectRatio:'1', overflow:'hidden' }}>
              <img src={img.preview || img.cloudinaryUrl} alt=""
                style={{ width:'100%', height:'100%', objectFit:'cover', outline: idx===0 ? '1.5px solid #D4AF37' : '1px solid rgba(212,175,55,0.1)' }} />
              {idx === 0 && (
                <div style={{ position:'absolute', top:3, left:3, background:'#D4AF37', color:'#0B0B0B', fontSize:'6px', letterSpacing:'1px', padding:'2px 5px', fontFamily:"'Jost',sans-serif", fontWeight:700, textTransform:'uppercase' }}>
                  ★
                </div>
              )}
              <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.6)', opacity:0, transition:'opacity 0.2s', display:'flex', alignItems:'center', justifyContent:'center', gap:'5px' }}
                onMouseEnter={e => e.currentTarget.style.opacity=1}
                onMouseLeave={e => e.currentTarget.style.opacity=0}>
                {idx !== 0 && (
                  <button type="button" onClick={e => { e.stopPropagation(); setPrimary(img.id); }}
                    style={{ fontSize:'6px', letterSpacing:'1px', textTransform:'uppercase', color:'#D4AF37', border:'1px solid rgba(212,175,55,0.5)', padding:'3px 5px', background:'transparent', cursor:'pointer', fontFamily:"'Jost',sans-serif" }}>
                    Set ★
                  </button>
                )}
                <button type="button" onClick={e => { e.stopPropagation(); removeImage(img.id); }}
                  style={{ padding:'4px', border:'1px solid rgba(239,68,68,0.5)', color:'rgb(252,165,165)', background:'transparent', cursor:'pointer', display:'flex' }}>
                  <Ic.trash />
                </button>
              </div>
            </div>
          ))}
          {/* Add more tile */}
          <button type="button" onClick={() => inputRef.current?.click()}
            style={{ aspectRatio:'1', border:'1px dashed rgba(212,175,55,0.15)', display:'flex', alignItems:'center', justifyContent:'center', color:'rgba(212,175,55,0.2)', background:'transparent', cursor:'pointer', transition:'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(212,175,55,0.35)'; e.currentTarget.style.color='rgba(212,175,55,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(212,175,55,0.15)'; e.currentTarget.style.color='rgba(212,175,55,0.2)'; }}>
            <Ic.plus />
          </button>
        </div>
      )}

      {/* Cloudinary note */}
      <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
        <div style={{ height:'1px', flex:1, background:'rgba(212,175,55,0.05)' }}/>
        <span style={{ fontFamily:"'Jost',sans-serif", fontSize:'8px', letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(212,175,55,0.18)', display:'flex', alignItems:'center', gap:'4px' }}>
          <Ic.cloud /> Uploads to Cloudinary on save
        </span>
        <div style={{ height:'1px', flex:1, background:'rgba(212,175,55,0.05)' }}/>
      </div>
    </div>
  );
}
