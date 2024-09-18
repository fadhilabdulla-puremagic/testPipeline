import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function CollapsePreview({preview, _handleClickPreview}) {
  const [open, setOpen] = useState(false);

  return (
    <>

    <div className="pb-2">
        <u className="text-primary d-flex justify-content-between" style={{fontWeight:'bold'}}>
            <div>
            <span style={{cursor:'pointer'}}>{preview.module_title}</span>
            <button
                className='btn-sm'
                style={{marginLeft: '10px', fontSize: 'large', color:'white', height: '30px', backgroundColor: '#30a655', border:'1px solid', borderRadius:'3px'}}
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
              {open ? <>&uarr;</>: <>&darr;</> }
            </button>
            </div>
            <span style={{marginRight:'1.5em', cursor:'pointer'}}
                onClick={()=>_handleClickPreview(preview.video_url)}
            >Preview</span>
        </u>
        
    </div>
      <Collapse in={open}>
        <div style={{paddingLeft:'20px'}} dangerouslySetInnerHTML={{ __html: preview.module_dscription }}></div>
      </Collapse>
    </>
  );
}

export default CollapsePreview;