document.addEventListener('DOMContentLoaded', function() {
    const videoUrlInput = document.getElementById('videoUrl');
    const downloadBtn = document.getElementById('downloadBtn');
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const error = document.getElementById('error');
    const previewVideo = document.getElementById('previewVideo');
    const downloadLink = document.getElementById('downloadLink');
    const downloadAudio = document.getElementById('downloadAudio');
    const errorMessage = document.getElementById('errorMessage');
    const videoQuality = document.getElementById('videoQuality');
    const videoSize = document.getElementById('videoSize');

    // Example URLs for quick testing
    const exampleUrls = [
        'https://www.instagram.com/reel/EXAMPLE/',
        'https://www.instagram.com/p/EXAMPLE/',
        'https://www.instagram.com/stories/EXAMPLE/'
    ];

    downloadBtn.addEventListener('click', handleDownload);
    videoUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleDownload();
    });

    // Add example URLs functionality
    document.querySelectorAll('.example-links span').forEach((span, index) => {
        span.addEventListener('click', () => {
            videoUrlInput.value = exampleUrls[index];
            handleDownload();
        });
    });

    async function handleDownload() {
        const url = videoUrlInput.value.trim();
        
        if (!url) {
            showError('Please enter an Instagram URL');
            return;
        }

        if (!isValidInstagramUrl(url)) {
            showError('Please enter a valid Instagram URL (reel, post, or story)');
            return;
        }

        hideAllSections();
        showLoading();

        try {
            // Simulate API call to Instagram downloader service
            const videoData = await fetchVideoData(url);
            
            if (videoData.success) {
                displayResult(videoData);
            } else {
                showError(videoData.message || 'Could not extract video. Please try another URL.');
            }
        } catch (err) {
            showError('Failed to process request. Please try again.');
            console.error('Download error:', err);
        }
    }

    function isValidInstagramUrl(url) {
        const instagramRegex = /instagram\.com\/(p|reel|tv|stories)\/[A-Za-z0-9_-]+/;
        return instagramRegex.test(url);
    }

    async function fetchVideoData(url) {
        // In a real implementation, this would call an Instagram scraping API
        // For demo purposes, we'll simulate with mock data
        return new Promise((resolve) => {
            setTimeout(() => {
                // Mock successful response
                resolve({
                    success: true,
                    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
                    thumbnail: 'https://via.placeholder.com/400x300/833ab4/ffffff?text=Instagram+Video',
                    audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
                    duration: '0:45',
                    quality: 'HD (720p)',
                    size: '5.2 MB'
                });
            }, 2000);
        });
    }

    function displayResult(data) {
        hideAllSections();
        result.style.display = 'block';

        // Set preview
        previewVideo.src = data.videoUrl;
        previewVideo.load();

        // Set download links
        downloadLink.href = data.videoUrl;
        downloadLink.download = `instagram_video_${Date.now()}.mp4`;
        
        downloadAudio.href = data.audioUrl || data.videoUrl;
        downloadAudio.download = `instagram_audio_${Date.now()}.mp3`;

        // Update info
        videoQuality.textContent = data.quality || 'HD';
        videoSize.textContent = data.size || '--';

        // Auto-play preview when loaded
        previewVideo.addEventListener('loadeddata', () => {
            previewVideo.play().catch(() => {});
        });
    }

    function showLoading() {
        loading.style.display = 'block';
    }

    function showError(message) {
        hideAllSections();
        errorMessage.textContent = message;
        error.style.display = 'block';
        setTimeout(() => {
            error.style.display = 'none';
        }, 5000);
    }

    function hideAllSections() {
        loading.style.display = 'none';
        result.style.display = 'none';
        error.style.display = 'none';
    }
});