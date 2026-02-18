// Opinion Battle - Main JavaScript File

// Data structures
let votes = {
    modi: 0,
    gandhi: 0
};

let opinions = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    updateVoteDisplay();
    loadOpinions();
    attachEventListeners();
});

// Load data from localStorage
function loadData() {
    const storedVotes = localStorage.getItem('opinionBattleVotes');
    const storedOpinions = localStorage.getItem('opinionBattleOpinions');
    const hasVoted = localStorage.getItem('opinionBattleHasVoted');
    
    if (storedVotes) {
        votes = JSON.parse(storedVotes);
    }
    
    if (storedOpinions) {
        opinions = JSON.parse(storedOpinions);
    }
    
    if (hasVoted) {
        disableVoting(hasVoted);
    }
}

// Save votes to localStorage
function saveVotes() {
    localStorage.setItem('opinionBattleVotes', JSON.stringify(votes));
}

// Save opinions to localStorage
function saveOpinions() {
    localStorage.setItem('opinionBattleOpinions', JSON.stringify(opinions));
}

// Attach event listeners
function attachEventListeners() {
    // Vote buttons
    document.getElementById('vote-modi').addEventListener('click', function() {
        castVote('modi');
    });
    
    document.getElementById('vote-gandhi').addEventListener('click', function() {
        castVote('gandhi');
    });
    
    // Opinion form
    document.getElementById('opinion-form').addEventListener('submit', function(e) {
        e.preventDefault();
        submitOpinion();
    });
}

// Cast a vote
function castVote(candidate) {
    const hasVoted = localStorage.getItem('opinionBattleHasVoted');
    
    if (hasVoted) {
        showMessage('You have already voted!', 'error');
        return;
    }
    
    // Increment vote count
    votes[candidate]++;
    
    // Save to localStorage
    saveVotes();
    localStorage.setItem('opinionBattleHasVoted', candidate);
    
    // Update display
    updateVoteDisplay();
    disableVoting(candidate);
    
    // Show success message
    const candidateName = candidate === 'modi' ? 'Narendra Modi' : 'Rahul Gandhi';
    showMessage(`Thank you! Your vote for ${candidateName} has been recorded.`, 'success');
    
    // Add animation to the voted card
    animateVote(candidate);
}

// Update vote display
function updateVoteDisplay() {
    const totalVotes = votes.modi + votes.gandhi;
    
    // Update vote counts
    document.getElementById('modi-votes').textContent = votes.modi;
    document.getElementById('gandhi-votes').textContent = votes.gandhi;
    document.getElementById('total-votes').textContent = totalVotes;
    
    // Calculate percentages
    let modiPercentage = 0;
    let gandhiPercentage = 0;
    
    if (totalVotes > 0) {
        modiPercentage = Math.round((votes.modi / totalVotes) * 100);
        gandhiPercentage = Math.round((votes.gandhi / totalVotes) * 100);
    }
    
    // Update percentage displays
    document.getElementById('modi-percentage').textContent = modiPercentage + '%';
    document.getElementById('gandhi-percentage').textContent = gandhiPercentage + '%';
    
    // Update percentage bars
    document.getElementById('modi-percentage-fill').style.width = modiPercentage + '%';
    document.getElementById('gandhi-percentage-fill').style.width = gandhiPercentage + '%';
}

// Disable voting after user has voted
function disableVoting(votedFor) {
    const modiBtn = document.getElementById('vote-modi');
    const gandhiBtn = document.getElementById('vote-gandhi');
    
    modiBtn.disabled = true;
    gandhiBtn.disabled = true;
    
    // Highlight the voted button
    if (votedFor === 'modi') {
        modiBtn.classList.add('voted');
        modiBtn.innerHTML = '<span>✓ Voted</span>';
    } else if (votedFor === 'gandhi') {
        gandhiBtn.classList.add('voted');
        gandhiBtn.innerHTML = '<span>✓ Voted</span>';
    }
}

// Animate vote action
function animateVote(candidate) {
    const card = document.getElementById(candidate + '-card');
    card.style.transform = 'scale(1.05)';
    card.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.2)';
    
    setTimeout(() => {
        card.style.transform = '';
        card.style.boxShadow = '';
    }, 500);
}

// Show message
function showMessage(message, type) {
    const messageDiv = document.getElementById('vote-message');
    messageDiv.textContent = message;
    messageDiv.className = 'vote-message ' + type;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.className = 'vote-message';
    }, 5000);
}

// Submit opinion
function submitOpinion() {
    const name = document.getElementById('opinion-name').value.trim() || 'Anonymous';
    const support = document.getElementById('opinion-support').value;
    const text = document.getElementById('opinion-text').value.trim();
    
    if (!support || !text) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Create opinion object
    const opinion = {
        id: Date.now(),
        name: name,
        support: support,
        text: text,
        timestamp: new Date().toISOString()
    };
    
    // Add to opinions array (at the beginning for most recent first)
    opinions.unshift(opinion);
    
    // Save to localStorage
    saveOpinions();
    
    // Reset form
    document.getElementById('opinion-form').reset();
    
    // Reload opinions display
    loadOpinions();
    
    // Show success message
    alert('Thank you for sharing your opinion!');
    
    // Scroll to opinions section
    document.getElementById('opinions-list').scrollIntoView({ behavior: 'smooth' });
}

// Load and display opinions
function loadOpinions() {
    const opinionsList = document.getElementById('opinions-list');
    
    if (opinions.length === 0) {
        opinionsList.innerHTML = '<div class="no-opinions">No opinions yet. Be the first to share!</div>';
        return;
    }
    
    opinionsList.innerHTML = '';
    
    opinions.forEach(opinion => {
        const opinionItem = createOpinionElement(opinion);
        opinionsList.appendChild(opinionItem);
    });
}

// Create opinion element
function createOpinionElement(opinion) {
    const div = document.createElement('div');
    div.className = 'opinion-item ' + opinion.support + '-support';
    
    const supportLabels = {
        'modi': 'Narendra Modi',
        'gandhi': 'Rahul Gandhi',
        'neutral': 'Neutral'
    };
    
    const timestamp = formatTimestamp(opinion.timestamp);
    
    div.innerHTML = `
        <div class="opinion-header">
            <span class="opinion-author">${escapeHtml(opinion.name)}</span>
            <span class="opinion-support-badge ${opinion.support}">Supports: ${supportLabels[opinion.support]}</span>
        </div>
        <div class="opinion-text">${escapeHtml(opinion.text)}</div>
        <div class="opinion-timestamp">${timestamp}</div>
    `;
    
    return div;
}

// Format timestamp
function formatTimestamp(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) {
        return 'Just now';
    } else if (diffMins < 60) {
        return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Optional: Add function to reset all data (for testing/admin)
function resetAllData() {
    if (confirm('Are you sure you want to reset all votes and opinions? This action cannot be undone.')) {
        localStorage.removeItem('opinionBattleVotes');
        localStorage.removeItem('opinionBattleOpinions');
        localStorage.removeItem('opinionBattleHasVoted');
        location.reload();
    }
}

// Optional: Export results
function exportResults() {
    const data = {
        votes: votes,
        opinions: opinions,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'opinion-battle-results.json';
    link.click();
    
    URL.revokeObjectURL(url);
}

// Make functions available globally (for console access if needed)
window.resetAllData = resetAllData;
window.exportResults = exportResults;
