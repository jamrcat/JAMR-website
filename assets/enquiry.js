document.addEventListener('DOMContentLoaded', () => {
 const form=document.getElementById('brs-enquiry'); if(!form)return;
 const output=document.getElementById('enquiry-output'),status=document.getElementById('enquiry-status');
 form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);
 output.value=`Hello José, I would like to discuss a Base Running Science™ engagement.\n\nClient type: ${data.get('client')}\nService: ${data.get('service')}\nLocation: ${data.get('location')}\nPreferred dates: ${data.get('dates')||'Flexible'}\nParticipants: ${data.get('participants')||'To discuss'}\n\nGoal: ${data.get('goal')}\n\nPlease let me know the next steps for a quote.`;
 status.textContent='Message prepared. Copy it and send it through your chosen contact channel. Nothing has been submitted.';output.focus();});
 document.getElementById('copy-enquiry').addEventListener('click',async()=>{if(!output.value){status.textContent='Prepare your enquiry first.';return;}
 try{await navigator.clipboard.writeText(output.value);status.textContent='Copied. Open LinkedIn or Instagram to send your message.';}catch{output.focus();output.select();status.textContent='Select and copy the message above, then send it through LinkedIn or Instagram.';}});
});
