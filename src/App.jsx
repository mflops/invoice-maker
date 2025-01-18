import html2pdf from 'html2pdf.js';
import { useState } from 'react';

function App() {
  const [title, setTitle] = useState('Invoice');
  const [items, setItems] = useState([]);
  const [payMethod, setPayMethod] = useState('UPI');
  const [note, setNote] = useState('---');
  const [date, setDate] = useState(
    new Date().toLocaleString('en-in', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
  );
  const [total, setTotal] = useState('0');
  function generatePdf() {
    const element = document.getElementById('invoice');
    const excludeElement = document.getElementById('excludeElement');
    excludeElement.setAttribute('style', 'display: none');
    const opt = {
      margin: 0,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 4, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        excludeElement.setAttribute(
          'style',
          "{'display: block', 'textAlign: 'center'}"
        );
      });
  }

  function addRow() {
    setItems([...items, ['Item', 0, 0.0, 0]]);
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <button onClick={generatePdf}>Download PDF</button>
      <div className='invoice-container' style={{ width: '80%' }}>
        <div
          id='invoice'
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            border: '1px solid #000',
            position: 'relative',
            width: '100%',
            fontFamily: 'Arial, roboto, sans-serif',
          }}
        >
          <div
            contentEditable='true'
            suppressContentEditableWarning='true'
            className='title'
            style={{
              padding: '1.5rem',
              fontSize: '3rem',
              outline: 'none',
              border: 'none',
              fontWeight: 'bold',
            }}
            onChange={(e) => setTitle(e.target.value)}
          >
            {title}
          </div>
          <div
            className='date'
            style={{
              paddingLeft: '1.5rem',
              paddingTop: '1.5rem',
              paddingBottom: '0.2rem',
            }}
          >
            <h3 style={{ display: 'inline-block' }}>Date:&nbsp;</h3>
            <div
              style={{ display: 'inline-block', outline: 'none' }}
              contentEditable
              suppressContentEditableWarning
              onChange={(e) => setDate(e.target.value)}
            >
              {date}
            </div>
          </div>
          <div
            className='billing-info'
            style={{
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              paddingTop: '0.2rem',
            }}
          >
            <div className='billed-to' style={{ width: '50%' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Billed To:</h3>
              <div
                contentEditable
                suppressContentEditableWarning
                style={{ outline: 'none' }}
              >
                Company Name
              </div>
              <div
                contentEditable
                suppressContentEditableWarning
                style={{ outline: 'none' }}
              >
                Address Line 1
              </div>
              <div
                contentEditable
                suppressContentEditableWarning
                style={{ outline: 'none' }}
              >
                Address Line 2
              </div>
              <div
                contentEditable
                suppressContentEditableWarning
                style={{ outline: 'none' }}
              >
                Email
              </div>
            </div>
            <div className='billed-from' style={{ width: '50%' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>From:</h3>
              <div
                contentEditable
                suppressContentEditableWarning
                style={{ outline: 'none' }}
              >
                Company Name
              </div>
              <div
                contentEditable
                suppressContentEditableWarning
                style={{ outline: 'none' }}
              >
                Address Line 1
              </div>
              <div
                contentEditable
                suppressContentEditableWarning
                style={{ outline: 'none' }}
              >
                Address Line 2
              </div>
              <div
                contentEditable
                suppressContentEditableWarning
                style={{ outline: 'none' }}
              >
                Email
              </div>
            </div>
          </div>
          <div className='table-of-contents' style={{ padding: '1.5rem' }}>
            <table
              style={{
                width: '100%',
                fontSize: '1.2rem',
                borderCollapse: 'collapse',
              }}
            >
              <thead style={{ textAlign: 'left', backgroundColor: '#d9d9d9' }}>
                <th style={{ width: '55%', padding: '0.5rem' }}>Item</th>
                <th
                  style={{
                    width: '15%',
                    padding: '0.5rem',
                    textAlign: 'center',
                  }}
                >
                  Quantity
                </th>
                <th
                  style={{
                    width: '15%',
                    padding: '0.5rem',
                    textAlign: 'center',
                  }}
                >
                  Price
                </th>
                <th
                  style={{
                    width: '15%',
                    padding: '0.5rem',
                    textAlign: 'center',
                  }}
                >
                  Amount
                </th>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} style={{ width: '100%' }}>
                    <td
                      style={{
                        width: '55%',
                        outline: 'none',
                        padding: '0.5rem',
                      }}
                      contentEditable='true'
                      suppressContentEditableWarning='true'
                    >
                      {item[0]}
                    </td>
                    <td
                      style={{
                        width: '15%',
                        outline: 'none',
                        padding: '0.5rem',
                        textAlign: 'center',
                      }}
                      contentEditable='true'
                      suppressContentEditableWarning='true'
                    >
                      {item[1]}
                    </td>
                    <td
                      style={{
                        width: '15%',
                        outline: 'none',
                        padding: '0.5rem',
                        textAlign: 'center',
                      }}
                      contentEditable='true'
                      suppressContentEditableWarning='true'
                    >
                      {item[2]}
                    </td>
                    <td
                      style={{
                        width: '15%',
                        outline: 'none',
                        padding: '0.5rem',
                        textAlign: 'center',
                      }}
                      contentEditable='true'
                      suppressContentEditableWarning='true'
                    >
                      {item[3]}
                    </td>
                  </tr>
                ))}
                <td
                  colSpan={4}
                  style={{ textAlign: 'center' }}
                  id='excludeElement'
                >
                  <button onClick={addRow} style={{ padding: '0.5rem 0.7rem' }}>
                    +
                  </button>
                </td>
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      textAlign: 'right',
                      borderTop: '2px solid #d1d1d1',
                      borderBottom: '2px solid #d1d1d1',
                      padding: '0.5rem',
                    }}
                  >
                    Total
                  </td>
                  <td
                    colSpan={1}
                    style={{
                      textAlign: 'center',
                      borderTop: '2px solid #d1d1d1',
                      borderBottom: '2px solid #d1d1d1',
                      padding: '0.5rem',
                      outline: 'none',
                    }}
                    onChange={(e) => setTotal(e.target.value)}
                    contentEditable
                    suppressContentEditableWarning
                  >
                    {total}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className='payment-method' style={{ paddingLeft: '1.5rem' }}>
            <h3 style={{ display: 'inline-block' }}>Payment Method: &nbsp;</h3>
            <div
              style={{
                display: 'inline-block',
                outline: 'none',
                minWidth: '60%',
                fontSize: '1.2rem',
              }}
              contentEditable
              suppressContentEditableWarning
              onChange={(e) => setPayMethod(e.target.value)}
            >
              {payMethod}
            </div>
          </div>
          <div className='note' style={{ paddingLeft: '1.5rem' }}>
            <h3 style={{ display: 'inline-block' }}>Note:&nbsp;</h3>
            <div
              style={{
                fontSize: '1.2rem',
                display: 'inline-block',
                minWidth: '60%',
                outline: 'none',
              }}
              contentEditable
              suppressContentEditableWarning
              onChange={(e) => setNote(e.target.value)}
            >
              {note}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
