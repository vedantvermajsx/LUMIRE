import { useState } from 'react';
import { S, focusStyle } from './AdminCommon';

export default function FInput({ label, name, defaultValue, value, onChange, placeholder, required, as, rows }) {
  const [focused, setFocused] = useState(false);
  const style = { ...S.input, ...(focused ? focusStyle : {}) };
  const ev = { onFocus:() => setFocused(true), onBlur:() => setFocused(false) };
  return (
    <div>
      <label style={S.label}>{label}</label>
      {as === 'textarea'
        ? <textarea name={name} defaultValue={defaultValue} value={value} onChange={onChange} placeholder={placeholder} required={required} rows={rows||4} style={{ ...style, resize:'none' }} {...ev} />
        : <input name={name} defaultValue={defaultValue} value={value} onChange={onChange} placeholder={placeholder} required={required} style={style} {...ev} />
      }
    </div>
  );
}
