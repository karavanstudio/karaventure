const REPO_OWNER = 'rafidhp';
const REPO_NAME = 'explorer_karawang-assets';
const BRANCH = 'main';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const base64Content = result.split(',')[1];
            resolve(base64Content);
        };
        reader.onerror = (error) => reject(error);
    });
};

export const getFileSha = async (filename: string, token: string): Promise<string | null> => {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filename}?ref=${BRANCH}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            
            return data.sha;
        }

        return null;
    } catch {
        return null;
    }
};

export const uploadToGithub = async (file: File, filename: string, token: string): Promise<string> => {
    const base64Content = await fileToBase64(file);
    const existingSha = await getFileSha(filename, token);

    const response = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filename}`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `upload: ${filename} via frontend`,
                content: base64Content,
                branch: BRANCH,
                ...(existingSha ? { sha: existingSha } : {}),
            }),
        }
    );

    if (!response.ok) {
        const errData = await response.json();

        throw new Error(errData.message || 'Gagal mengunggah gambar ke GitHub');
    }

    return `https://cdn.jsdelivr.net/gh/${REPO_OWNER}/${REPO_NAME}@${BRANCH}/${filename}`;
};

export const deleteFromGithub = async (fileUrlOrName: string, token: string): Promise<boolean> => {
    const filename = fileUrlOrName.split('/').pop();

    if (!filename) {
        return false;
    }

    const sha = await getFileSha(filename, token);

    if (!sha) {
        return true;
    }

    const response = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filename}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `delete: ${filename} via frontend`,
                sha: sha,
                branch: BRANCH,
            }),
        }
    );

    return response.ok;
};