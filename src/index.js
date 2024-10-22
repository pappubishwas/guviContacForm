"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const contactForm = document.getElementById("contactForm");
(_a = document.getElementById('contactForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        contactNumber: document.getElementById('contactNumber').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
    };
    const responseMessage = document.getElementById('responseMessage');
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
        const response = yield fetch('https://671678883fcb11b265d28ea7.mockapi.io/contactFormSubmissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = yield response.json();
        if (response.ok) {
            responseMessage.innerText = 'Form Submitted Successfully!';
            contactForm.reset();
            responseMessage.style.color = 'green';
        }
        else {
            responseMessage.innerText = `Submission Failed: ${data.message || 'Unknown error'}`;
        }
    }
    catch (error) {
        console.error('Submission error:', error);
        responseMessage.innerText = 'Error in Submission!';
    }
}));
