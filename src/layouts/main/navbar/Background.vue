<template>
    <button class="btn menu-text fw-bold" @click="showModal = true">切换背景</button>

    <!-- 模态框 -->
    <div v-if="showModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="close" @click="showModal = false">×</span>
            </div>
            <div class="modal-body">
                <label>请输入背景图片的URL: </label>
                <input type=text v-model="backgroundUrl" placeholder="背景图片URL" />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="setBackground">设置背景</button>
                <button type="button" class="btn btn-primary" @click="showModal = false">关闭</button>
            </div>
        </div>
    </div>

</template>
    
<script>
    import eventBus from './eventBus.js';
    export default {
        name: 'Background',

    data() {
        return {
            showModal: false, // 正确地放在data函数中
            backgroundUrl: '', // 正确地放在data函数中
        };
    },
    
    methods: {
        setBackground() {
            if (this.backgroundUrl.trim()) {
                this.updateBackground(this.backgroundUrl);

                // 保存URL到LocalStorage
                localStorage.setItem('backgroundUrl', this.backgroundUrl);
                // 关闭模态框
                this.showModal = false;

                // 清空输入框
                this.backgroundUrl = '';

            } else {
                alert('请输入有效的图片URL');
            }
        },
        updateBackground(url) {
            eventBus.emit('background-updated', url);
        }
    }
}

</script>
    
    
<style>
    /* 模态框背景 */
    .modal {
        display: flex;
        background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
        z-index: 100; /* 确保模态框在页面其他元素之上 */
    }

    /* 模态框内容 */
    .modal-content {
        background: #fff;
        width: 100%;
        max-width: 320px; /* 模态框的最大宽度 */
        margin: auto;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加阴影 */
    }

    /* 模态头部 */
    .modal-header {
        display: flex;
        justify-content: flex-end; /* 将关闭按钮放到头部右侧 */
        padding: 5px 15px; /* 外边距 */
    }

    /* 关闭按钮 */
    .close {
        cursor: pointer;
        font-size: 24px;
        color: #ccc; /* 按钮颜色 */
    }

    /* 模态正文 */
    .modal-body {
        padding: 5px 15px; /* 外边距 */
    }

    .modal-body label {
        color: #000; /* 字体颜色设置为黑色 */
        font-size: 12px; /* 设置标签字体更小一些 */
        display: block; /* 使标签独占一行 */
        margin-bottom: 5px; /* 与输入框之间的间距 */
    }

    .modal-body input[type=text] {
        width: 100%;
        padding: 10px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
    }

    /* 模态底部 */
    .modal-footer {
        display: flex;
        justify-content: center;
        gap: 10px; /* 按钮之间的间距 */
        padding: 10px;
    }


    /* 按钮样式 */
    .btn {
        padding: 8px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .btn-primary {
        background-color: #007bff; /* 主按钮背景色 */
        color: white;
    }

    .btn-primary:hover {
        background-color: #0056b3; /* 鼠标悬停效果 */
    }

</style>