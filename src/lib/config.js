module.exports = {
    preload: {
        MAKER_AMBIENT_PREFIX: "maker",
        MAKER_AMBIENT_COUNT: 24,
        MAKER_COUNT: 2,
        MAKER_AMBIENT_TYPES: ['jpg', 'mp4'],
        CDN_HOST: "s3-ap-southeast-2.amazonaws.com/cdn.labs.theguardian.com",
        CDN_BUCKET: "2015/meet-the-makers/",
        VIDEOS_PREFIX : "videos/",
        IMAGES_PREFIX : "images/",
        CDN_PROTOCOL : "http"
    },
    timeline: {
        INTERVAL: 201.5,
        SENSITIVITY: 20
    },
    ambientVideo: {
        WIDTH: 640,
        HEIGHT: 360
    }
}