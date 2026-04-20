/**
 * Game Data & Roles
 */
const roles = [
    {
        id: 'patriot',
        name: 'Nhân Dân',
        faction: 'CÁCH MẠNG',
        factionClass: 'red',
        description: 'Không có kỹ năng đặc biệt. Tham gia bỏ phiếu vào ban ngày để tìm ra Mật thám.',
        image: 'assets/images/role_patriot.png',
        defaultColor: 'linear-gradient(135deg, #43a047, #1b5e20)'
    },
    {
        id: 'spy',
        name: 'Mật Thám',
        faction: 'MẬT THÁM',
        factionClass: 'dark',
        description: 'Mỗi đêm cùng đồng bọn chọn ám sát 1 người phe Cách mạng.',
        image: 'assets/images/role_spy.png',
        defaultColor: 'linear-gradient(135deg, #424242, #000000)'
    },
    {
        id: 'seer',
        name: 'Giao Liên',
        faction: 'CÁCH MẠNG',
        factionClass: 'red',
        description: 'Mỗi đêm có quyền kiểm tra thân phận của 1 người (phe Cách mạng hay Mật thám).',
        image: 'assets/images/role_seer.png',
        defaultColor: 'linear-gradient(135deg, #1e88e5, #0d47a1)'
    },
    {
        id: 'bodyguard',
        name: 'Tự Vệ',
        faction: 'CÁCH MẠNG',
        factionClass: 'red',
        description: 'Mỗi đêm chọn bảo vệ 1 người. Không thể bảo vệ cùng 1 người 2 đêm liên tiếp.',
        image: 'assets/images/role_bodyguard.png',
        defaultColor: 'linear-gradient(135deg, #ffb300, #ff6f00)'
    },
    {
        id: 'medic',
        name: 'Quân Y',
        faction: 'CÁCH MẠNG',
        factionClass: 'red',
        description: 'Sở hữu 1 bình thuốc cứu (cứu người bị giết) và 1 bình thuốc độc (giết 1 người).',
        image: 'assets/images/role_medic.png',
        defaultColor: 'linear-gradient(135deg, #e53935, #b71c1c)'
    },
    {
        id: 'hunter',
        name: 'Du Kích',
        faction: 'CÁCH MẠNG',
        factionClass: 'red',
        description: 'Khi bị loại (bị cắn hoặc bị vote treo cổ), được quyền nổ súng kéo theo 1 người chết cùng.',
        image: 'assets/images/role_hunter.png',
        defaultColor: 'linear-gradient(135deg, #7cb342, #33691e)'
    }
];

// Placeholder for images (since all were successfully generated via AI!)
// We use fallback gradients if images don't load.
const FALLBACK_BACKGROUNDS = {
    patriot: 'linear-gradient(135deg, #43a047, #1b5e20)',
    spy: 'linear-gradient(135deg, #424242, #000000)',
    seer: 'linear-gradient(135deg, #1e88e5, #0d47a1)',
    bodyguard: 'linear-gradient(135deg, #ffb300, #ff6f00)',
    medic: 'linear-gradient(135deg, #e53935, #b71c1c)',
    hunter: 'linear-gradient(135deg, #7cb342, #33691e)'
};

// UI Elements
const homeScreen = document.getElementById('home-screen');
const roleScreen = document.getElementById('role-screen');
const btnStart = document.getElementById('btn-start');
const btnRules = document.getElementById('btn-rules');
const btnBack = document.getElementById('btn-back');

const rulesModal = document.getElementById('rules-modal');
const closeModalBtn = document.querySelector('.close-btn');

const card = document.getElementById('role-card');
const roleImage = document.getElementById('role-image');
const roleName = document.getElementById('role-name');
const roleFaction = document.getElementById('role-faction');
const roleDesc = document.getElementById('role-desc');
const instructionText = document.getElementById('instruction-text');
const imgWrapper = document.querySelector('.card-image-wrapper');

let isCardRevealed = false;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    populateRules();

    // Event Listeners
    btnStart.addEventListener('click', showRoleScreen);
    btnRules.addEventListener('click', () => rulesModal.classList.add('active'));
    closeModalBtn.addEventListener('click', () => rulesModal.classList.remove('active'));
    rulesModal.addEventListener('click', (e) => {
        if (e.target === rulesModal) rulesModal.classList.remove('active');
    });

    card.addEventListener('click', flipCard);
    btnBack.addEventListener('click', resetGame);
});

function populateRules() {
    const listContainer = document.getElementById('roles-list-container');
    roles.forEach(role => {
        const item = document.createElement('div');
        item.className = `role-item ${role.factionClass === 'dark' ? 'spy-item' : ''}`;
        item.innerHTML = `
            <h4>📍 ${role.name} (${role.faction})</h4>
            <p>${role.description}</p>
        `;
        listContainer.appendChild(item);
    });
}

function showRoleScreen() {
    homeScreen.classList.remove('active');
    roleScreen.classList.add('active');
    roleScreen.classList.remove('hidden');

    // Randomize
    assignRole();
}

function assignRole() {
    // Simple random assignment (in a real app with multiple users, this would need a backend)
    const randomRole = roles[Math.floor(Math.random() * roles.length)];

    // Setup Card Data
    roleName.textContent = randomRole.name;
    roleFaction.textContent = randomRole.faction;
    roleFaction.className = `faction-badge ${randomRole.factionClass}`;
    roleDesc.textContent = randomRole.description;

    // Try to load the image. If it fails (like our missing ones), use Unsplash placeholder.
    roleImage.src = randomRole.image;
    roleImage.onerror = () => {
        roleImage.style.display = 'none';
        imgWrapper.style.backgroundImage = FALLBACK_BACKGROUNDS[randomRole.id] || randomRole.defaultColor;
        imgWrapper.style.backgroundSize = 'cover';
        imgWrapper.style.backgroundPosition = 'center';
    };
}

function flipCard() {
    if (isCardRevealed) return;

    card.classList.add('flipped');
    isCardRevealed = true;

    instructionText.textContent = "Chạm 'Trở Về' khi bạn đã ghi nhớ vai trò.";
    btnBack.classList.remove('hidden');
}

function resetGame() {
    // Reset state
    card.classList.remove('flipped');
    isCardRevealed = false;
    btnBack.classList.add('hidden');
    instructionText.textContent = "Chạm để tiết lộ";

    // Show home after card flip animation finishes
    setTimeout(() => {
        roleScreen.classList.remove('active');
        roleScreen.classList.add('hidden');
        homeScreen.classList.add('active');

        // Reset image setup
        roleImage.style.display = 'block';
        imgWrapper.style.backgroundImage = 'none';
        roleImage.src = '';
    }, 800);
}
