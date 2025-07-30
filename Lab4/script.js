const feedbackForm = document.getElementById('feedbackForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const departmentSelect = document.getElementById('department');
const ratingInputs = document.querySelectorAll('input[name="rating"]');
const commentsTextarea = document.getElementById('comments');
const charCountSpan = document.getElementById('charCount');
const feedbacksContainer = document.getElementById('feedbacksContainer');
const noFeedbacksDiv = document.getElementById('noFeedbacks');

const STORAGE_KEY = 'studentFeedbacks';

document.addEventListener('DOMContentLoaded', function() {
    checkSessionStorage();
    displayAllFeedbacks();
    setupEventListeners();
});

function checkSessionStorage() {
    if (sessionStorage.getItem('hasVisited')) {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'mt-4 p-3 bg-blue-100 text-blue-800 rounded-lg';
        welcomeMessage.textContent = 'Welcome back! You can submit another feedback if needed.';
        document.querySelector('.text-center').appendChild(welcomeMessage);
    } else {
        sessionStorage.setItem('hasVisited', 'true');
    }
}

function setupEventListeners() {
    feedbackForm.addEventListener('submit', handleFormSubmit);
    commentsTextarea.addEventListener('input', updateCharCount);
    ratingInputs.forEach(input => {
        input.addEventListener('change', handleRatingChange);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const feedback = {
        id: Date.now(),
        fullName: fullNameInput.value.trim(),
        email: emailInput.value.trim(),
        department: departmentSelect.value,
        rating: parseInt(document.querySelector('input[name="rating"]:checked').value),
        comments: commentsTextarea.value.trim(),
        timestamp: new Date().toISOString()
    };
    
    saveFeedback(feedback);
    feedbackForm.reset();
    updateCharCount();
    resetRatingLabels();
    displayAllFeedbacks();
    alert('Feedback submitted successfully!');
}

function saveFeedback(feedback) {
    let feedbacks = getFeedbacksFromStorage();
    feedbacks.push(feedback);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));
}

function getFeedbacksFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function displayAllFeedbacks() {
    const feedbacks = getFeedbacksFromStorage();
    
    if (feedbacks.length === 0) {
        feedbacksContainer.innerHTML = '';
        noFeedbacksDiv.classList.remove('hidden');
        return;
    }
    
    noFeedbacksDiv.classList.add('hidden');
    const feedbacksHTML = feedbacks.map(feedback => createFeedbackCard(feedback)).join('');
    feedbacksContainer.innerHTML = feedbacksHTML;
}

function createFeedbackCard(feedback) {
    const ratingStars = '★'.repeat(feedback.rating) + '☆'.repeat(5 - feedback.rating);
    const date = new Date(feedback.timestamp).toLocaleDateString();
    const time = new Date(feedback.timestamp).toLocaleTimeString();
    
    return `
        <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-lg font-semibold text-gray-800">${feedback.fullName}</h3>
                    <p class="text-sm text-gray-600">${feedback.email}</p>
                </div>
                <button onclick="deleteFeedback(${feedback.id})" 
                        class="text-red-500 hover:text-red-700 text-sm font-medium">
                    Delete
                </button>
            </div>
            
            <div class="space-y-3">
                <div>
                    <span class="text-sm font-medium text-gray-700">Department:</span>
                    <span class="text-sm text-gray-600 ml-2">${feedback.department}</span>
                </div>
                
                <div>
                    <span class="text-sm font-medium text-gray-700">Rating:</span>
                    <div class="text-yellow-500 text-lg mt-1">${ratingStars}</div>
                </div>
                
                ${feedback.comments ? `
                    <div>
                        <span class="text-sm font-medium text-gray-700">Comments:</span>
                        <p class="text-sm text-gray-600 mt-1">${feedback.comments}</p>
                    </div>
                ` : ''}
                
                <div class="text-xs text-gray-500 pt-2 border-t">
                    Submitted on ${date} at ${time}
                </div>
            </div>
        </div>
    `;
}

function deleteFeedback(id) {
    if (confirm('Are you sure you want to delete this feedback?')) {
        let feedbacks = getFeedbacksFromStorage();
        feedbacks = feedbacks.filter(feedback => feedback.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));
        displayAllFeedbacks();
        alert('Feedback deleted successfully!');
    }
}


function updateCharCount() {
    const count = commentsTextarea.value.length;
    charCountSpan.textContent = count;
}

function handleRatingChange(event) {
    document.querySelectorAll('.rating-label').forEach(label => {
        label.classList.remove('bg-blue-600', 'text-white');
        label.classList.add('border-gray-300');
    });
    
    const selectedLabel = event.target.nextElementSibling;
    selectedLabel.classList.add('bg-blue-600', 'text-white');
    selectedLabel.classList.remove('border-gray-300');
}

function resetRatingLabels() {
    document.querySelectorAll('.rating-label').forEach(label => {
        label.classList.remove('bg-blue-600', 'text-white');
        label.classList.add('border-gray-300');
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm() {
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const department = departmentSelect.value;
    const rating = document.querySelector('input[name="rating"]:checked');
    
    if (!fullName) {
        alert('Please enter your full name');
        return false;
    }
    
    if (!email || !validateEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (!department) {
        alert('Please select your department');
        return false;
    }
    
    if (!rating) {
        alert('Please select a rating');
        return false;
    }
    
    return true;
}