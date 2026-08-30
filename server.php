<?php

/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * @package  Laravel
 * @author   Taylor Otwell <taylor@laravel.com>
 */

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/'
);

$mimeTypes = [
    'css' => 'text/css',
    'js' => 'application/javascript',
    'mjs' => 'application/javascript',
    'json' => 'application/json',
    'map' => 'application/json',
    'svg' => 'image/svg+xml',
    'png' => 'image/png',
    'jpg' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'gif' => 'image/gif',
    'webp' => 'image/webp',
    'ico' => 'image/x-icon',
    'woff' => 'font/woff',
    'woff2' => 'font/woff2',
    'ttf' => 'font/ttf',
    'otf' => 'font/otf',
    'eot' => 'application/vnd.ms-fontobject',
    'mp4' => 'video/mp4',
    'webm' => 'video/webm',
    'html' => 'text/html',
    'txt' => 'text/plain',
];

$publicRoot = realpath(__DIR__.'/public');

$servePublicFile = static function (string $candidate) use ($publicRoot, $mimeTypes): bool {
    if ($publicRoot === false) {
        return false;
    }

    $file = realpath($candidate);
    if ($file === false || !is_file($file)) {
        return false;
    }

    $rootPrefix = strtolower($publicRoot).DIRECTORY_SEPARATOR;
    if (!str_starts_with(strtolower($file), $rootPrefix)) {
        return false;
    }

    $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    if ($extension === 'php') {
        return false;
    }

    header('Content-Type: '.($mimeTypes[$extension] ?? 'application/octet-stream'));
    readfile($file);

    return true;
};

// php -S is started from the project root. Admin assets are requested as
// /public/assets/... which live at ./public/assets/...
if ($uri !== '/' && $servePublicFile(__DIR__.$uri)) {
    return true;
}

// React (and other) assets are requested as /react-landing/... which live
// at ./public/react-landing/...
if ($uri !== '/' && $servePublicFile(__DIR__.'/public'.$uri)) {
    return true;
}

require_once __DIR__.'/public/index.php';
