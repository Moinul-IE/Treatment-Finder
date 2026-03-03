// user button

function navigateToPage() {
    // Change the URL to the desired page
    window.location.href = '/userTarget'; // Replace with your target page
}



  
const hospitals = {
    Dhaka: [
        "Dhaka, City Hospital", "Dhaka, General Hospital", "Dhaka, Apollo Hospital", 
        "Dhaka, Square Hospital", "Dhaka, United Hospital", "Dhaka, Evercare Hospital",
        "Dhaka Medical College Hospital", "Narayanganj, Diabetes Care Clinic", 
        "Narayanganj, Family Hospital", "Narayanganj General Hospital", 
        "Narsingdi, Cancer Care Center", "Narsingdi, Cancer Hospital", "Narsingdi General Hospital",
        "Tangail, District Hospital", "Tangail General Hospital", 
        "Kishoreganj, Health Complex", "Kishoreganj General Hospital"
    ],
    Chittagong: [
        "Chittagong, Children's Hospital", "Chittagong, Medical College Hospital",
        "Chittagong, Max Hospital", "Chittagong, Parkview Hospital", 
        "Comilla, Digestive Health Center", "Comilla, City Hospital", 
        "Comilla Medical College Hospital", "Cumilla, Modern Hospital", 
        "Brahmanbaria, Mental Health Center", "Brahmanbaria, General Hospital",
        "Brahmanbaria Sadar Hospital", "Cox's Bazar, Sea View Hospital",
        "Cox's Bazar Sadar Hospital", "Noakhali, Medical College Hospital", 
        "Noakhali General Hospital", "Lakshmipur, Health Care Hospital", 
        "Lakshmipur Sadar Hospital"
    ],
    Mymensingh: [
        "Mymensingh, Eye Hospital", "Mymensingh, Eye Care Hospital", 
        "Mymensingh Medical College Hospital", "Netrakona, General Hospital", 
        "Netrokona General Hospital", "Netrakona Sadar Hospital", 
        "Jamalpur General Hospital", "Sherpur General Hospital"
    ],
    Rangpur: [
        "Rangpur, Divisional Hospital", "Panchagarh, Community Health Center",
        "Panchagarh General Hospital", "Rangpur Medical College Hospital"
    ],
    Khulna: [
        "Khulna, Heart Care Center", "Khulna, City Medical Center", 
        "Khulna Medical College Hospital", "Jessore, General Hospital", 
        "Jessore General Hospital", "Satkhira, Sadar Hospital", 
        "Satkhira Sadar Hospital", "Chuadanga, Medical College Hospital", 
        "Chuadanga Sadar Hospital"
    ],
    Rajshahi: [
        "Rajshahi, Skin Clinic", "Rajshahi, Community Hospital", 
        "Rajshahi Medical College Hospital", "Pabna, Urology Clinic", 
        "Pabna, Heart Hospital", "Pabna General Hospital", 
        "Bogra, Cancer Care Hospital", "Bogra Medical College Hospital"
    ],
    Barisal: [
        "Barisal, Brain Health Center", "Barisal, Health Care Hospital", 
        "Barisal Sher-e-Bangla Medical College Hospital", "Barisal Sadar Hospital", 
        "Bhola, General Hospital", "Patuakhali, Medical College Hospital"
    ],
    Sylhet: [
        "Sylhet, Bone and Joint Hospital", "Sylhet, Specialist Hospital", 
        "Sylhet, MediCare Hospital", "Sylhet Osmani Medical College Hospital", 
        "Moulvibazar, Sadar Hospital", "Moulvibazar Sadar Hospital"
    ]
};

function filterHospitals() {
    const division = document.getElementById("division").value;
    const hospitalSelect = document.getElementById("hospital");

    // Clear existing options
    hospitalSelect.innerHTML = '<option value="">Select Hospital</option>';

    if (hospitals[division]) {
        hospitals[division].forEach(hospital => {
            const option = document.createElement("option");
            option.value = hospital;
            option.textContent = hospital;
            hospitalSelect.appendChild(option);
        });
    }
}

// login 

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navCollapse = document.querySelector('.nav-collapse');
    if (navToggle && navCollapse) {
        navToggle.addEventListener('click', () => {
            const isOpen = navCollapse.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }
});
