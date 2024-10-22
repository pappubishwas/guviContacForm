

interface ContactFormData {
    name: string;
    email: string;
    contactNumber: string;
    subject: string;
    message: string;
}


const contactForm = document.getElementById("contactForm") as HTMLFormElement;

document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData: ContactFormData = {
        name: (document.getElementById('name') as HTMLInputElement).value,
        email: (document.getElementById('email') as HTMLInputElement).value,
        contactNumber: (document.getElementById('contactNumber') as HTMLInputElement).value,
        subject: (document.getElementById('subject') as HTMLInputElement).value,
        message: (document.getElementById('message') as HTMLTextAreaElement).value,
    };
    const responseMessage = document.getElementById('responseMessage')!;

// Field empty or not
if (!formData.name || !formData.email || !formData.contactNumber || !formData.subject || !formData.message) {
    responseMessage.innerText = 'All fields are required!';
    return;
}

// Email validation
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(formData.email)) {
    responseMessage.innerText = 'Invalid Email Format!';
    return;
}

// Phone number validation

if (!/^\d+$/.test(formData.contactNumber)) {
    responseMessage.innerText = 'Contact Number must be numeric!';
    return;
}

try {
    // Api call using post method....
    
    console.log("Mock api is calling..");
    const response = await fetch('https://671678883fcb11b265d28ea7.mockapi.io/contactFormSubmissions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
        responseMessage.innerText = 'Form Submitted Successfully!';
        contactForm.reset(); 
        responseMessage.style.color='green';
    } else {
        responseMessage.innerText = `Submission Failed: ${data.message || 'Unknown error'}`;
    }
} catch (error) {
    console.error('Submission error:', error);
    responseMessage.innerText = 'Error in Submission!';
}
});


