// TODO: Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const fileListContainer = document.getElementById('file-list-container');
const processDisplay = document.getElementById('process-display');
const showroomGallery = document.getElementById('showroom-gallery'); // Added for Showroom gallery
const containerNav = document.getElementById('container-nav'); // Get the container navigation element
const auth = firebase.auth();

// Get the new button elements
const backButton = document.querySelector('.button-back');
const forwardButton = document.querySelector('.button-forward');
const loadButton = document.querySelector('.button-load');
const downloadButton = document.querySelector('.button-download');
const refreshButton = document.querySelector('.button-refresh');
const logicButton = document.querySelector('.button-logic');
const optionsButton = document.getElementById('options-button'); // Get the options button
const reportButton = document.querySelector('.button-report');
const themesMenu = document.getElementById('themes-menu'); // Get the themes menu container
const loginBackgroundBlur = document.getElementById('login-background-blur'); // Get the blur overlay
const searchOptionsContainer = document.getElementById('search-options-container'); // Get the options container



document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const loginButton = document.getElementById('login-button');
    const uploadButton = document.getElementById('upload-button');

    // Load the saved theme on startup
    applySavedTheme();

    // Add event listeners for the new buttons
    if (backButton) {
        backButton.addEventListener('click', () => {
            console.log('Back button clicked');
            // TODO: Implement back navigation logic
        });
    }
    if (forwardButton) {
        forwardButton.addEventListener('click', () => {
            console.log('Forward button clicked');
            // TODO: Implement forward navigation logic
        });
    }
    if (loadButton) {
        loadButton.addEventListener('click', () => {
            console.log('Load button clicked');
            // TODO: Implement load logic (if different from refresh)
        });
    }
    // Download button listener is handled per file entry in displayFileEntryInFileManager
    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            console.log('Refresh button clicked');
            // TODO: Implement refresh logic
 fetchAndDisplayFiles(); // Refresh file list in File Manager
 fetchAndDisplayMediaInShowroom(); // Refresh media in Showroom
 fetchAndDisplayContainers(); // Refresh containers list
        });
    }


    const showroomSection = document.getElementById('showroom-viewer');
    const fileManagerSection = document.getElementById('file-manager-editor');    

    // Event listener for the options button to toggle the options container
    optionsButton.addEventListener('click', () => {
        searchOptionsContainer.style.display = searchOptionsContainer.style.display === 'block' ? 'none' : 'block';
        // TODO: Dynamically populate options based on context if needed
        populateSearchOptions();
    });

    searchButton.addEventListener('click', () => {
        // Read the state of the search options
        const selectedOptions = getSelectedSearchOptions();
        console.log('Selected Search Options:', selectedOptions);
        const query = searchInput.value;

        // Include logic option status in search query if logic button exists
        let includeLogic = false;
        if (logicButton) {
             includeLogic = logicButton.classList.contains('active'); // Assuming an 'active' class indicates logic is enabled
        }
        
        // Include report option status if report button exists
        let includeReport = false;
        if (reportButton) {
             includeReport = reportButton.classList.contains('active'); // Assuming an 'active' class indicates report generation
        }
        
        console.log('Include Logic:', includeLogic);
        console.log('Include Report:', includeReport);
        console.log('Search Query:', query);
        // Future: Add logic to handle search and potentially trigger AI function after login
    });

    loginButton.addEventListener('click', () => {
        console.log('Login button clicked');
        // Placeholder login function
        handleLogin();
    });

    function handleLogin() {
        console.log('Attempting to log in...');
        // Using Firebase Authentication - Example with Google Provider
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = result.credential;
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // Now the user object is available in the outer scope for Firebase operations
                console.log('Firebase Authentication successful:', user);
                // The auth state change listener will handle the rest
            }).catch((error) => {
                console.error('Firebase Authentication error:', error);
            });
    }

    // Add event listener for the logic button
    if (logicButton) {
        logicButton.addEventListener('click', () => {
            console.log('Logic button clicked');
            logicButton.classList.toggle('active'); // Toggle active state
            // TODO: Add visual feedback for active state
        });
    }

    // Add event listener for the report button
    if (reportButton) {
         reportButton.addEventListener('click', () => {
            console.log('Report button clicked');
            reportButton.classList.toggle('active'); // Toggle active state
         });
    }
    function handleSuccessfulLogin() {
        console.log('User logged in successfully.');
        // TODO: Show AI features and re-enable previous functionalities
        showroomSection.style.display = 'block'; // Show the showroom
 if (loginBackgroundBlur) loginBackgroundBlur.classList.remove('blurred'); // Remove blur on successful login
        fileManagerSection.style.display = 'block'; // Show the file manager/editor
        fetchAndDisplayFiles(); // Fetch and display files after login
        fetchAndDisplayContainers(); // Fetch and display containers after login

        // Three.js basic setup for 3D viewer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-js-canvas') });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();
    }


    // Listen for Firebase Auth state changes
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in.
            handleSuccessfulLogin();
        } else {
            // User is signed out.
 if (loginBackgroundBlur) loginBackgroundBlur.classList.add('blurred'); // Apply blur on sign out
        }
    });

    // Function to fetch and display files (using placeholder data for now)
    function fetchAndDisplayFiles() {
        console.log('Fetching files for File Manager...');
        // Call the Cloud Function to get file metadata
        // This function should return file metadata including directory/container information
        // This function now accepts an optional containerId
        const getFilesMetadataFunction = firebase.functions().httpsCallable('getFilesMetadata'); // Replace with your Cloud Function name
        
        getFilesMetadataFunction()
            .then((result) => {
                // Assuming the result data includes files with containerIds
                const files = result.data.files;
                fileListContainer.innerHTML = ''; // Clear current list

                // Assuming we also want to display these files in the showroom if no container is selected
                // This might need adjustment based on your design
                // displayFilesInShowroomGallery(files);

                if (files && files.length > 0) {
                    files.forEach(file => {
                        displayFileEntryInFileManager(file); // Display in File Manager
                        displayFileInShowroom(file); // Display in Showroom
                    });
                } else {
 fileListContainer.innerHTML = '<p>No files uploaded yet.</p>';
 }
            })
            .catch((error) => {
                console.error('Error fetching file metadata:', error);
 fileListContainer.innerHTML = '<p>Error loading files.</p>';
            });
    }

    function displayFileEntryInFileManager(file) {
        const fileElement = document.createElement('div');
        fileElement.classList.add('file-entry');
        fileElement.innerHTML = `
                <span>${file.name}</span>
                <span>Tags: ${file.tags.join(', ')}</span>
                <button class="download-button" data-google-drive-id="${file.googleDriveId}">Download</button>
                <a href="#" class="view-showroom-link" data-file-id="${file.id}">View</a>
            `;
        // Add the visibility selection element
        const visibilitySelect = createVisibilitySelect(file.visibility);
        // Initialize the dropdown with the current visibility status
        visibilitySelect.value = file.visibility || 'private'; // Default to private if not set
        fileElement.appendChild(visibilitySelect);


 // Add event listener to download button for this file
 fileListContainer.appendChild(fileElement); // Append the file element before adding listeners
 fileElement.querySelector('.download-button').addEventListener('click', (event) => {
                const googleDriveId = event.target.dataset.googleDriveId;
                if (googleDriveId) {
                    handleDownload(googleDriveId);
                } else {
                const googleDriveId = event.target.dataset.googleDriveId;
                    handleDownload(googleDriveId);
                }
            });

    }
    
    // Function to fetch and display media in the Showroom based on container
    function fetchAndDisplayMediaInShowroom(containerId = null) {
        console.log(`Fetching and displaying media in Showroom for container: ${containerId || 'All'}`);
        // Call a Cloud Function to get media metadata, optionally filtered by container
        const getMediaFunction = firebase.functions().httpsCallable('getMedia'); // Replace with your Cloud Function name for fetching media
    
        getMediaFunction({ containerId: containerId }) // Pass the containerId to the Cloud Function
            .then((result) => {
                const mediaItems = result.data.mediaItems; // Assuming result data includes media items
                showroomGallery.innerHTML = ''; // Clear current gallery

                if (mediaItems && mediaItems.length > 0) {
                    mediaItems.forEach(item => {
                        displayFileInShowroom(item); // Reuse display function
                    });
                } else {
                    showroomGallery.innerHTML = '<p>No media to display in this container.</p>';
                }
            })
            .catch((error) => {
                console.error('Error fetching media for showroom:', error);
                showroomGallery.innerHTML = '<p>Error loading media.</p>';
            });

    }

    function displayFileInShowroom(file) {
        // This function will display the file in the Showroom gallery
        // We need to handle different media types (images, videos, 3D models)
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('showroom-item'); // Base class
        galleryItem.classList.add(file.contentType.split('/')[0] + '-item'); // Add class based on media type (e.g., 'image-item', 'video-item')
        galleryItem.dataset.fileId = file.id;
        // Assuming 'containerIds' field in file metadata, handle multiple containers
        if (file.containerIds && file.containerIds.length > 0) {
            galleryItem.dataset.containerIds = file.containerIds.join(','); // Store as comma-separated string
        } else {
             galleryItem.dataset.containerIds = ''; // No container
        }

        let mediaElement;

        // Simple check for content type to determine display element
        if (file.contentType.startsWith('image/')) {
            mediaElement = document.createElement('img');
            // For now, use a placeholder or assume a direct URL if available
            // In a real app, you'd get a viewable URL from Google Drive or Cloud Storage
            mediaElement.src = 'https://via.placeholder.com/150?text=' + file.name; // Placeholder image
            // mediaElement.src = file.viewUrl; // Use a view URL from backend
        } else if (file.contentType.startsWith('video/')) {
            mediaElement = document.createElement('video');
            mediaElement.width = 200; // Example size
            mediaElement.controls = true;
            mediaElement.src = 'https://www.w3schools.com/html/mov_bbb.mp4'; // Example placeholder video (ensure CORS allows)
            // mediaElement.src = file.viewUrl; // Use a view URL from backend
        } else if (file.contentType.startsWith('audio/')) {
             mediaElement = document.createElement('audio');
             mediaElement.controls = true;
             mediaElement.src = 'https://www.w3schools.com/html/horse.mp3'; // Example placeholder audio (ensure CORS allows)
        } else {
            mediaElement = document.createElement('div');
            mediaElement.textContent = `Unsupported format: ${file.contentType}`;
        }

        galleryItem.appendChild(mediaElement);
        showroomGallery.appendChild(galleryItem);

        // TODO: Implement logic to display 3D models in the Three.js canvas when selected
        // You might add an event listener to the galleryItem to trigger the 3D viewer
    }

    // Function to display files directly in the showroom gallery (alternative to fetching again)
    function displayFilesInShowroomGallery(files) {
      // This function would iterate through files and call displayFileInShowroom for each
    }

    // Function to fetch and display container structure
    function fetchAndDisplayContainers() {
        console.log('Fetching and displaying containers...');
        // Call a Cloud Function to get container data
        const getContainersFunction = firebase.functions().httpsCallable('getContainers'); // Replace with your Cloud Function name
        getContainersFunction()
            .then((result) => {
                const containers = result.data.containers; // Assuming result has a 'containers' array
                displayContainers(containers);
            })
            .catch((error) => {
                console.error('Error fetching containers:', error);
                containerNav.innerHTML = '<p>Error loading containers.</p>';
            });
    }

    // Function to display containers in the navigation area
    function displayContainers(containers) {
        containerNav.innerHTML = '<h3>Containers</h3>'; // Clear and add title
        if (containers && containers.length > 0) {
            containers.forEach(container => {
                const containerElement = document.createElement('div');
                containerElement.classList.add('container-item'); // Style this class
 containerElement.classList.add('nav-item'); // Add generic nav item class for styling
                containerElement.textContent = container.name;
                containerElement.dataset.containerId = container.id; // Store container ID
                containerNav.appendChild(containerElement);

                // Add event listener to filter media by container
                containerElement.addEventListener('click', () => {
                    filterMediaByContainer(container.id);
                });
            });
        } else {
            containerNav.innerHTML += '<p>No containers found.</p>';
        }
    }

    // Function to filter and display media based on selected container
    function filterMediaByContainer(containerId) {
        console.log(`Filtering media by container ID: ${containerId}`);
        // Instead of filtering existing elements, we now fetch data from the backend
        // based on the selected container.
        fetchAndDisplayMediaInShowroom(containerId);
    }
    
    // Function to show all media (e.g., when no container is selected)
    function showAllMedia() {
         console.log('Showing all media in Showroom.');
         // Call fetchAndDisplayMediaInShowroom without a containerId
         fetchAndDisplayMediaInShowroom(null);
    }

    // --- Themes Menu Logic ---
    // Populate the themes menu (placeholder for now)
    function populateThemesMenu() {
        if (!themesMenu) return;

        const themes = [
            { name: 'Default Theme', class: 'theme-default' },
            { name: 'Modern Theme', class: 'theme-modern' },
            { name: 'Dark Theme', class: 'theme-dark' }
        ];

        themesMenu.innerHTML = '<h4>Themes</h4>';
        themes.forEach(theme => {
            const themeOption = document.createElement('button');
            themeOption.classList.add('theme-option'); // Style this class
            themeOption.textContent = theme.name;
            themeOption.dataset.themeClass = theme.class;
            themesMenu.appendChild(themeOption);

            themeOption.addEventListener('click', () => {
                applyTheme(theme.class);
            });
        });
    }
    // Function to update file visibility using a Firebase Cloud Function
    async function updateFileVisibility(fileId, visibility) {
    }

    // Function to update tags for a file using a Firebase Cloud Function
    async function updateFileTags(fileId, tags) {
        console.log(`Attempting to update tags for file ID: ${fileId} with tags: ${tags}`);
        const updateTagsFunction = firebase.functions().httpsCallable('updateFileTags'); // Replace with your Cloud Function name

        try {
            const result = await updateTagsFunction({ fileId: fileId, tags: tags });
            console.log('Tags updated successfully:', result.data);
        } catch (error) {
            console.error('Error updating tags:', error);
        }
    }

    // Function to apply a selected theme
    function applyTheme(themeClass) {
        // Remove all existing theme classes from relevant elements
        document.body.classList.remove('theme-default', 'theme-modern', 'theme-dark'); // Add all possible themes here
        // You might need to remove theme classes from specific button/icon elements too

        // Add the selected theme class
        document.body.classList.add(themeClass);
        // You might need to add themeClass to specific button/icon elements too

        // Save the selected theme to local storage
        localStorage.setItem('selectedTheme', themeClass);
    }

    // Function to load and apply the saved theme on startup
    function applySavedTheme() {

    // File Manager and 3-Tag Editor Logic
    fileInput.addEventListener('change', (event) => {
        handleFileSelection(event.target.files);
    });

    uploadButton.addEventListener('click', () => {
        initiateUpload();
    });

    // Function to update the process display area
    function updateProcessDisplay(message) {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        processDisplay.appendChild(messageElement);
        // Auto-scroll to the bottom
        processDisplay.scrollTop = processDisplay.scrollHeight;
    }

    // Helper function to read file as Data URL (be cautious with large files)
    function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }
    // Placeholder for handling file selection
    function handleFileSelection(files) {
        console.log('Files selected:', files);
        // TODO: Display selected files in a temporary list before upload
        // And allow adding tags to them before initiating the upload
    }

    function initiateUpload() {
        const files = fileInput.files;
        const tagsInput = document.getElementById('file-tags-input'); // Assuming an input field for tags
        if (files.length === 0) {
            updateProcessDisplay('No files selected for upload.');
            return;
        }

        updateProcessDisplay(`Initiating upload for ${files.length} file(s)...`);

        // TODO: Get tags associated with each file from the UI
        // This needs to be more sophisticated to handle tags per file if multiple are selected
        // For now, assuming tags are applied generally or per file before this step
        const globalTags = tagsInput ? tagsInput.value.split(',').map(tag => tag.trim()) : [];

        const fileTags = globalTags; // Using global tags as a placeholder
        uploadFiles(files, fileTags);

    }
    // Placeholder function for handling download
    async function handleDownload(googleDriveId) {
    try {
        const result = await getDownloadUrlFunction({ googleDriveId: googleDriveId });
        const downloadUrl = result.data.downloadUrl;
        updateProcessDisplay(`Download URL received: ${downloadUrl}`);
        // Open the download URL in a new tab
        window.open(downloadUrl, '_blank');
    } catch (error) {
        console.error('Error getting download URL:', error);
        updateProcessDisplay(`Failed to get download URL: ${error.message}`);
    }
}
// Function to upload files using a Firebase Cloud Function
async function uploadFiles(files, tags) {
    const uploadFunction = firebase.functions().httpsCallable('uploadFile'); // Replace 'uploadFile' with the actual name of your Cloud Function

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileTag = tags[file.name] || []; // Get tags for this file, or an empty array

        updateProcessDisplay(`Uploading file ${i + 1} of ${files.length}: ${file.name}...`);

        try {

            // For large files, consider breaking them into chunks or using a different method
            // This example sends the entire file data in the request, which might have size limits
            const fileData = await readFileAsDataURL(file); // Convert file to Data URL for sending

            const result = await uploadFunction({
                name: file.name,
                type: file.type,
                data: fileData,
                tags: fileTag
            });
            updateProcessDisplay(`Upload of ${file.name} successful. Response: ${JSON.stringify(result.data)}`);
        } catch (error) {
            updateProcessDisplay(`Upload of ${file.name} failed: ${error.message}`);
        }
    }
}

// Function to create the visibility select element
function createVisibilitySelect(currentVisibility) {
    const visibilitySelect = document.createElement('select');
    visibilitySelect.classList.add('file-visibility-select');
    visibilitySelect.innerHTML = `
        <option value="private">Private</option>
        <option value="public">Public</option>
    `;
    visibilitySelect.value = currentVisibility || 'private';

    // Add event listener to visibility selection
    visibilitySelect.addEventListener('change', (event) => {
        const newVisibility = event.target.value;
        // Find the parent file element to get the file ID
        const fileElement = event.target.closest('.file-entry');
        if (fileElement) {
            const fileId = fileElement.dataset.fileId;
            updateFileVisibility(fileId, newVisibility);
        }
    });
    return visibilitySelect;
}
});