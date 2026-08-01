<?php

/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * @package  Laravel
 * @author   Taylor Otwell <taylor@laravel.com>
 */

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? ''
);

// 6amMart views call asset('public/...'), but `php artisan serve` uses the
// public/ directory as the document root. Serve those files from public/.
if (str_starts_with($uri, '/public/')) {
    $mappedUri = substr($uri, 7);
    $mappedFile = __DIR__.'/public'.$mappedUri;

    if ($mappedUri !== '/' && is_file($mappedFile)) {
        $extension = strtolower(pathinfo($mappedFile, PATHINFO_EXTENSION));
        $mimeTypes = [
            'css' => 'text/css',
            'js' => 'application/javascript',
            'mjs' => 'application/javascript',
            'json' => 'application/json',
            'map' => 'application/json',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'gif' => 'image/gif',
            'svg' => 'image/svg+xml',
            'webp' => 'image/webp',
            'ico' => 'image/x-icon',
            'woff' => 'font/woff',
            'woff2' => 'font/woff2',
            'ttf' => 'font/ttf',
            'eot' => 'application/vnd.ms-fontobject',
            'otf' => 'font/otf',
            'mp4' => 'video/mp4',
            'webm' => 'video/webm',
            'pdf' => 'application/pdf',
        ];

        $mime = $mimeTypes[$extension]
            ?? (function_exists('mime_content_type') ? mime_content_type($mappedFile) : false)
            ?: 'application/octet-stream';

        header('Content-Type: '.$mime);
        header('Content-Length: '.filesize($mappedFile));
        readfile($mappedFile);
        exit;
    }
}

// This file allows us to emulate Apache's "mod_rewrite" functionality from the
// built-in PHP web server. This provides a convenient way to test a Laravel
// application without having installed a "real" web server software here.
if ($uri !== '/' && file_exists(__DIR__.'/public'.$uri)) {
    return false;
}

require_once __DIR__.'/public/index.php';
