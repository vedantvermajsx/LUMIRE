import { useState } from 'react';
import apiService from '../../services/ApiService';
import ImageDropzone from './ImageDropzone';
import FInput from './FInput';
import { Ic, S, focusStyle, CATEGORIES, MATERIALS } from './AdminCommon';
import useBreakpoint from '../../hooks/useBreakpoint';
import { formatPrice } from '../../utils/priceFormatter';

export default function InventoryModal({ editingPiece, onClose, onSave }) {
  const { isMobile } = useBreakpoint();
  const [images, setImages] = useState(() => {
    if (editingPiece?.images?.length) return editingPiece.images;
    if (editingPiece?.image) return [{ id:'existing', preview:editingPiece.image, status:'uploaded', cloudinaryUrl:editingPiece.image }];
    return [];
  });
  const [saving, setSaving] = useState(false);
  const [catFocused, setCatFocused] = useState(false);
  const [matFocused, setMatFocused] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(() => {
    if (!editingPiece?.material) return MATERIALS[0];
    return MATERIALS.includes(editingPiece.material) ? editingPiece.material : 'Custom...';
  });
  const [customMaterial, setCustomMaterial] = useState(editingPiece?.material || '');

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    
    try {
      const updatedImages = await Promise.all(images.map(async (img) => {
        if (img.file) {
          const url = await apiService.uploadImage(img.file);
          return { ...img, cloudinaryUrl: url, file: null, preview: url, status: 'uploaded' };
        }
        return img;
      }));

      const data = new FormData(e.target);
      const piece = Object.fromEntries(data.entries());
      piece.stones = piece.stones.split(',').map(s => s.trim()).filter(Boolean);
      piece.images = updatedImages;
      piece.image  = updatedImages[0]?.cloudinaryUrl || updatedImages[0]?.preview || '';
      
      if (selectedMaterial === 'Custom...') {
        piece.material = customMaterial;
      }

      const priceNumber = parseInt(piece.price);
      const priceLabel = piece.priceLabel || 'From';
      piece.price = formatPrice(priceNumber, priceLabel);
      delete piece.priceLabel;

      await onSave(piece, editingPiece?._id);
      onClose();
    } catch (err) {
      alert('Error saving piece. Please check your connection and Cloudinary credentials.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ position:'fixed', inset:0, zIndex:3000, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(5,5,5,0.93)', backdropFilter:'blur(12px)', padding: isMobile ? '0' : '16px' }}>
      <div style={{ background:'#0D0D0D', border:'1px solid rgba(212,175,55,0.15)', width:'100%', maxWidth:'620px', margin: isMobile ? '0' : '0 16px', maxHeight: isMobile ? '100dvh' : '92vh', height: isMobile ? '100dvh' : 'auto', overflowY:'auto', display:'flex', flexDirection:'column' }}>

        {/* Header */}
        <div style={{ position:'sticky', top:0, zIndex:10, background:'#0D0D0D', borderBottom:'1px solid rgba(212,175,55,0.08)', padding:'22px 28px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'17px', color:'#D4AF37', letterSpacing:'2px' }}>
              {editingPiece?._id ? 'Edit Piece' : 'Add New Piece'}
            </h3>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:'9px', letterSpacing:'2px', textTransform:'uppercase', color:'rgba(245,245,245,0.2)', marginTop:'3px', fontWeight:300 }}>
              {editingPiece?._id ? 'Refine collection entry' : 'Catalogue a new piece'}
            </p>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(245,245,245,0.2)', padding:'4px', transition:'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color='rgba(245,245,245,0.6)'}
            onMouseLeave={e => e.currentTarget.style.color='rgba(245,245,245,0.2)'}>
            <Ic.close />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding:'28px', display:'flex', flexDirection:'column', gap:'18px', overflowY:'auto', flex:1, paddingRight:'12px' }}>
          <ImageDropzone images={images} onImagesChange={setImages} />

          <div style={{ height:'1px', background:'rgba(212,175,55,0.06)', margin:'4px 0' }}/>

          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:'14px' }}>
            <FInput label="Name"     name="name"     defaultValue={editingPiece?.name}     placeholder="Collection name" required />
            <FInput label="Subtitle" name="subtitle" defaultValue={editingPiece?.subtitle} placeholder="Poetic subtitle" required />
          </div>
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:'14px' }}>
            <div>
              <label style={S.label}>Category</label>
              <select 
                name="category" 
                defaultValue={editingPiece?.category || CATEGORIES[0]} 
                required 
                style={{ ...S.input, ...(catFocused ? focusStyle : {}), appearance: 'none', cursor: 'pointer' }}
                onFocus={() => setCatFocused(true)}
                onBlur={() => setCatFocused(false)}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat} style={{ background: '#0D0D0D', color: '#F5F5F5' }}>{cat}</option>
                ))}
              </select>
            </div>
            <FInput
              label="Price (Number only, in ₹)"
              name="price"
              type="number"
              defaultValue={editingPiece?.price ? parseInt(editingPiece.price.replace(/\D/g, '')) : ''}
              placeholder="e.g., 1302000"
              required
              title="Enter only the numeric amount in rupees"
            />
          </div>
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:'14px' }}>
            <FInput
              label="Price Label Prefix"
              name="priceLabel"
              type="text"
              defaultValue={editingPiece?.priceLabel || 'From'}
              placeholder="e.g., From, Starting from, Price"
              title="Label shown before the price"
            />
            <FInput label="Era/Edition" name="era" defaultValue={editingPiece?.era} placeholder="Heritage 1887" required />
          </div>
          <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:'14px' }}>
            <div>
              <label style={S.label}>Material</label>
              <select 
                name="material" 
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                required 
                style={{ ...S.input, ...(matFocused ? focusStyle : {}), appearance: 'none', cursor: 'pointer' }}
                onFocus={() => setMatFocused(true)}
                onBlur={() => setMatFocused(false)}
              >
                {MATERIALS.map(mat => (
                  <option key={mat} value={mat} style={{ background: '#0D0D0D', color: '#F5F5F5' }}>{mat}</option>
                ))}
              </select>
            </div>
          </div>

          {selectedMaterial === 'Custom...' && (
            <FInput 
              label="Custom Material Name" 
              name="custom_material" 
              value={customMaterial}
              onChange={(e) => setCustomMaterial(e.target.value)}
              placeholder="e.g. 14K Gold Plated" 
              required 
            />
          )}
          <FInput label="Gemstones (comma separated)" name="stones" defaultValue={editingPiece?.stones?.join(', ')} placeholder="Diamond, Ruby, Sapphire" required />
          <FInput label="Description" name="description" as="textarea" rows={3} defaultValue={editingPiece?.description} placeholder="Describe this extraordinary piece…" required />

          <div style={{ display:'flex', gap:'10px', paddingTop:'6px' }}>
            <button type="submit" disabled={saving}
              style={{ flex:1, background:'#D4AF37', color:'#0B0B0B', border:'none', padding:'14px', fontFamily:"'Jost',sans-serif", fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1, transition:'all 0.2s' }}
              onMouseEnter={e => { if(!saving) e.currentTarget.style.background='#C9A432'; }}
              onMouseLeave={e => e.currentTarget.style.background='#D4AF37'}>
              {saving ? 'Saving…' : 'Save Piece'}
            </button>
            <button type="button" onClick={onClose}
              style={{ flex:1, background:'transparent', color:'rgba(245,245,245,0.4)', border:'1px solid rgba(245,245,245,0.1)', padding:'14px', fontFamily:"'Jost',sans-serif", fontSize:'10px', letterSpacing:'3px', textTransform:'uppercase', cursor:'pointer', transition:'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(245,245,245,0.2)'; e.currentTarget.style.color='rgba(245,245,245,0.65)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(245,245,245,0.1)'; e.currentTarget.style.color='rgba(245,245,245,0.4)'; }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
