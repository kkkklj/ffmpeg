import fs from 'fs'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { join } from 'path'
import ffmpeg from 'fluent-ffmpeg'

// 获取 __dirname 的 ESM 写法
const __dirname = dirname(fileURLToPath(import.meta.url))
const command = ffmpeg('./input/banner-video.mp4');
command
    .videoCodec('libx264') // 设置视频编解码器
    // .audioCodec('libfaac') // 设置 音频解码器
    .format('hls') // 输出视频格式
    .outputOptions('-hls_list_size 0') //  -hls_list_size n:设置播放列表保存的最多条目，设置为0会保存有所片信息，默认值为5
    .outputOption('-hls_time 5') // -hls_time n: 设置每片的长度，默认值为2。单位为秒
    .output(join(__dirname, './output/ForeverAi.m3u8')) // 输出文件
    .on('progress', (progress) => { // 监听切片进度
      console.log('Processing: ' + progress.percent + '% done');
    })
    .on('end', () => { // 监听结束
      console.log("视频切片完成");
    })
    .run()