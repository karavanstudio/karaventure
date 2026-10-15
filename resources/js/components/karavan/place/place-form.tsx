import { useForm, Link, router } from '@inertiajs/react';
import { Plus, Save, Loader2, X } from 'lucide-react';
import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { uploadToGithub, deleteFromGithub } from '@/lib/github-upload';
import { showSuccessToast, showErrorToast } from '@/lib/toast';
import { index, store, update } from '@/routes/place';
import type { Category } from '@/types/category';
import type { Place } from '@/types/place';

interface ImageItem {
    url: string;
    previewUrl: string;
    isUploading: boolean;
}

interface PlaceFormProps {
    categories: Category[];
    place?: Place;
    githubToken: string;
}

export default function PlaceForm({ categories, place, githubToken }: PlaceFormProps) {
    const isEdit = Boolean(place);

    const { data, setData, processing, errors } = useForm({
        category_id: place?.category_id ?? '',
        name: place?.name ?? '',
        tagline: place?.tagline ?? '',
        description: place?.description ?? '',
        tags: place?.tags ? place.tags.join(', ') : '',
        avg_rating: place?.avg_rating ?? 0,
        address: place?.address ?? '',
        district: place?.district ?? '',
        hours: place?.hours ?? '',
        lat: place?.lat ?? '',
        lng: place?.lng ?? '',
        is_featured: place?.is_featured ?? false,
        is_trending: place?.is_trending ?? false,
        is_hidden: place?.is_hidden ?? false,

        main_image: place?.place_images?.[0]?.image ?? '',
        gallery_images:
            place?.place_images?.slice(1).map((img) => img.image) ??
            ([] as string[]),
        roblox_image: place?.roblox_images?.[0]?.image ?? '',
    });

    const [mainImage, setMainImage] = useState<ImageItem | null>(
        place?.place_images?.[0]?.image
            ? {
                  url: place.place_images[0].image,
                  previewUrl: place.place_images[0].image,
                  isUploading: false,
              }
            : null,
    );

    const [galleryImages, setGalleryImages] = useState<ImageItem[]>(
        place?.place_images?.slice(1).map((img) => ({
            url: img.image,
            previewUrl: img.image,
            isUploading: false,
        })) ?? [],
    );

    const [robloxImage, setRobloxImage] = useState<ImageItem | null>(
        place?.roblox_images?.[0]?.image
            ? {
                  url: place.roblox_images[0].image,
                  previewUrl: place.roblox_images[0].image,
                  isUploading: false,
              }
            : null,
    );

    const isUploadingAny =
        Boolean(mainImage?.isUploading) ||
        galleryImages.some((img) => img.isUploading) ||
        Boolean(robloxImage?.isUploading);

    const generateFilename = (baseName: string, suffix: string, file: File) => {
        const slug = (baseName || 'place')
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-');
        const ext = file.name.split('.').pop() || 'jpeg';

        return `${slug}${suffix}.${ext}`;
    };

    const handleMainImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        setMainImage({ url: '', previewUrl, isUploading: true });

        try {
            const filename = generateFilename(data.name, '', file);
            const cdnUrl = await uploadToGithub(file, filename, githubToken);
            setMainImage({ url: cdnUrl, previewUrl, isUploading: false });
            setData('main_image', cdnUrl);
        } catch (err) {
            alert('Upload Main Image gagal!');
            console.error(err);
            setMainImage(null);
        }
    };

    const handleGalleryChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        if (files.length === 0) {
            return;
        }

        const newItems: ImageItem[] = files.map((file) => ({
            url: '',
            previewUrl: URL.createObjectURL(file),
            isUploading: true,
        }));

        setGalleryImages((prev) => [...prev, ...newItems]);

        const uploadedUrls: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const suffix = `-${galleryImages.length + i + 2}`;
            const filename = generateFilename(data.name, suffix, file);

            try {
                const cdnUrl = await uploadToGithub(file, filename, githubToken);
                uploadedUrls.push(cdnUrl);

                setGalleryImages((prev) =>
                    prev.map((item) =>
                        item.previewUrl === newItems[i].previewUrl
                            ? { ...item, url: cdnUrl, isUploading: false }
                            : item,
                    ),
                );
            } catch (err) {
                alert(`Upload gallery image (${file.name}) gagal!`);
                console.error(err);
                setGalleryImages((prev) =>
                    prev.filter(
                        (item) => item.previewUrl !== newItems[i].previewUrl,
                    ),
                );
            }
        }

        setData('gallery_images', [...data.gallery_images, ...uploadedUrls]);
    };

    const handleRobloxImageChange = async (
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        setRobloxImage({ url: '', previewUrl, isUploading: true });

        try {
            const filename = generateFilename(data.name, '-roblox', file);
            const cdnUrl = await uploadToGithub(file, filename, githubToken);
            setRobloxImage({ url: cdnUrl, previewUrl, isUploading: false });
            setData('roblox_image', cdnUrl);
        } catch (err) {
            alert('Upload Roblox Image gagal!');
            console.error(err);
            setRobloxImage(null);
        }
    };

    const handleDeleteMainImage = async () => {
        if (mainImage?.url) {
            await deleteFromGithub(mainImage.url, githubToken);
        }

        setMainImage(null);
        setData('main_image', '');
    };

    const handleDeleteGalleryImage = async (index: number) => {
        const target = galleryImages[index];

        if (target?.url) {
            await deleteFromGithub(target.url, githubToken);
        }

        const updated = galleryImages.filter((_, i) => i !== index);
        setGalleryImages(updated);
        setData(
            'gallery_images',
            updated.map((item) => item.url),
        );
    };

    const handleDeleteRobloxImage = async () => {
        if (robloxImage?.url) {
            await deleteFromGithub(robloxImage.url, githubToken);
        }

        setRobloxImage(null);
        setData('roblox_image', '');
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formattedTags =
            typeof data.tags === 'string'
                ? data.tags
                      .split(',')
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                : data.tags;

        const payload = {
            ...data,
            tags: formattedTags,
        };

        const options = {
            onSuccess: () => {
                if (isEdit) {
                    showSuccessToast('Success!', 'Place data successfully updated!');
                } else {
                    showSuccessToast('Success!', 'Place data successfully created!');
                }
            },
            onError: (errors: Record<string, string>) => {
                const errorMessage = Object.values(errors)[0] || 'Terjadi kesalahan saat menyimpan data.';
                showErrorToast('Gagal Menyimpan', errorMessage);
            },
        };

        if (isEdit && place?.id) {
            router.post(update(place), {
                _method: 'PUT',
                ...payload,
            }, options);
        } else {
            router.post(store().url, payload, options);
        }
    };

    const inputStyle = `
        w-full bg-black text-white rounded-md border border-white/20 px-3 py-2 text-sm
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20
        placeholder:text-zinc-500 disabled:opacity-50
    `;

    const labelStyle = 'block text-sm font-medium text-white/80 mb-1.5';
    const errorStyle = 'text-red-400 text-xs mt-1';

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Main Info Card */}
            <div className="space-y-4 rounded-xl border border-white/20 bg-black p-6">
                <h3 className="border-b border-white/10 pb-3 text-lg font-semibold text-white">
                    {isEdit ? 'Edit Place Details' : 'Basic Information'}
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className={labelStyle}>Place Name *</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g. Curug Cigentis"
                            className={inputStyle}
                        />
                        {errors.name && (
                            <p className={errorStyle}>{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className={labelStyle}>Category *</label>
                        <select
                            value={data.category_id}
                            onChange={(e) =>
                                setData('category_id', e.target.value)
                            }
                            className={inputStyle}
                        >
                            <option
                                value=""
                                disabled
                                className="bg-black text-zinc-500"
                            >
                                Select Category
                            </option>
                            {categories.map((cat) => (
                                <option
                                    key={cat.id}
                                    value={cat.id}
                                    className="bg-black text-white"
                                >
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <p className={errorStyle}>{errors.category_id}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className={labelStyle}>Tagline</label>
                    <input
                        type="text"
                        value={data.tagline}
                        onChange={(e) => setData('tagline', e.target.value)}
                        placeholder="e.g. Air terjun tersembunyi di kaki Gunung Sanggabuana"
                        className={inputStyle}
                    />
                    {errors.tagline && (
                        <p className={errorStyle}>{errors.tagline}</p>
                    )}
                </div>

                <div>
                    <label className={labelStyle}>Description *</label>
                    <textarea
                        rows={4}
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Write full description here..."
                        className={inputStyle}
                    />
                    {errors.description && (
                        <p className={errorStyle}>{errors.description}</p>
                    )}
                </div>

                <div>
                    <label className={labelStyle}>
                        Tags (separated by comma)
                    </label>
                    <input
                        type="text"
                        value={data.tags}
                        onChange={(e) => setData('tags', e.target.value)}
                        placeholder="air terjun, hiking, instagramable, sejuk"
                        className={inputStyle}
                    />
                    {errors.tags && <p className={errorStyle}>{errors.tags}</p>}
                </div>
            </div>

            {/* Location & Details */}
            <div className="space-y-4 rounded-xl border border-white/20 bg-black p-6">
                <h3 className="border-b border-white/10 pb-3 text-lg font-semibold text-white">
                    Location & Details
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className={labelStyle}>District</label>
                        <input
                            type="text"
                            value={data.district}
                            onChange={(e) =>
                                setData('district', e.target.value)
                            }
                            placeholder="e.g. Tegalwaru"
                            className={inputStyle}
                        />
                        {errors.district && (
                            <p className={errorStyle}>{errors.district}</p>
                        )}
                    </div>

                    <div>
                        <label className={labelStyle}>Operating Hours</label>
                        <input
                            type="text"
                            value={data.hours}
                            onChange={(e) => setData('hours', e.target.value)}
                            placeholder="e.g. 07.00 - 17.00 / 24 jam"
                            className={inputStyle}
                        />
                        {errors.hours && (
                            <p className={errorStyle}>{errors.hours}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className={labelStyle}>Full Address *</label>
                    <textarea
                        rows={2}
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        placeholder="Desa Mekarbuana, Tegalwaru, Karawang"
                        className={inputStyle}
                    />
                    {errors.address && (
                        <p className={errorStyle}>{errors.address}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label className={labelStyle}>Latitude</label>
                        <input
                            type="number"
                            step="any"
                            value={data.lat}
                            onChange={(e) =>
                                setData(
                                    'lat',
                                    e.target.value
                                        ? parseFloat(e.target.value)
                                        : '',
                                )
                            }
                            placeholder="-6.60000000"
                            className={inputStyle}
                        />
                        {errors.lat && (
                            <p className={errorStyle}>{errors.lat}</p>
                        )}
                    </div>

                    <div>
                        <label className={labelStyle}>Longitude</label>
                        <input
                            type="number"
                            step="any"
                            value={data.lng}
                            onChange={(e) =>
                                setData(
                                    'lng',
                                    e.target.value
                                        ? parseFloat(e.target.value)
                                        : '',
                                )
                            }
                            placeholder="107.20000000"
                            className={inputStyle}
                        />
                        {errors.lng && (
                            <p className={errorStyle}>{errors.lng}</p>
                        )}
                    </div>

                    <div>
                        <label className={labelStyle}>Average Rating</label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={data.avg_rating}
                            onChange={(e) =>
                                setData(
                                    'avg_rating',
                                    e.target.value
                                        ? parseFloat(e.target.value)
                                        : 0,
                                )
                            }
                            placeholder="4.5"
                            className={inputStyle}
                        />
                        {errors.avg_rating && (
                            <p className={errorStyle}>{errors.avg_rating}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Visibility & Flags */}
            <div className="space-y-4 rounded-xl border border-white/20 bg-black p-6">
                <h3 className="border-b border-white/10 pb-3 text-lg font-semibold text-white">
                    Status & Visibility
                </h3>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
                        <input
                            type="checkbox"
                            checked={data.is_featured}
                            onChange={(e) =>
                                setData('is_featured', e.target.checked)
                            }
                            className="size-4 rounded border-white/20 bg-black text-white focus:ring-white/10"
                        />
                        <span className="text-sm font-medium text-white">
                            Featured Place
                        </span>
                    </label>

                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
                        <input
                            type="checkbox"
                            checked={data.is_trending}
                            onChange={(e) =>
                                setData('is_trending', e.target.checked)
                            }
                            className="size-4 rounded border-white/20 bg-black text-white focus:ring-white/10"
                        />
                        <span className="text-sm font-medium text-white">
                            Trending Place
                        </span>
                    </label>

                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
                        <input
                            type="checkbox"
                            checked={data.is_hidden}
                            onChange={(e) =>
                                setData('is_hidden', e.target.checked)
                            }
                            className="size-4 rounded border-white/20 bg-black text-white focus:ring-white/10"
                        />
                        <span className="text-sm font-medium text-white">
                            Hide Place from Users
                        </span>
                    </label>
                </div>
            </div>

            {/* Media Upload Section */}
            <div className="space-y-6 rounded-xl border border-white/20 bg-black p-6">
                <h3 className="border-b border-white/10 pb-3 text-lg font-semibold text-white">
                    Images
                </h3>

                {/* Main Place Image */}
                <div>
                    <label className={labelStyle}>Main Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageChange}
                        disabled={isUploadingAny}
                        className={inputStyle}
                    />
                    {mainImage && (
                        <div className="group relative mt-2 h-28 w-40 overflow-hidden rounded-lg border border-white/20">
                            <img
                                src={mainImage.previewUrl}
                                alt="Main Preview"
                                className="h-full w-full object-cover"
                            />
                            {mainImage.isUploading ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                                    <Loader2 className="size-6 animate-spin text-white" />
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleDeleteMainImage}
                                    className="absolute top-1 right-1 rounded-full bg-red-600/80 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
                                >
                                    <X className="size-4" />
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Gallery Images */}
                <div>
                    <label className={labelStyle}>Gallery Images</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryChange}
                        disabled={isUploadingAny}
                        className={inputStyle}
                    />
                    {galleryImages.length > 0 && (
                        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {galleryImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="group relative h-24 overflow-hidden rounded-lg border border-white/20"
                                >
                                    <img
                                        src={img.previewUrl}
                                        alt={`Gallery ${idx}`}
                                        className="h-full w-full object-cover"
                                    />
                                    {img.isUploading ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                                            <Loader2 className="size-6 animate-spin text-white" />
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeleteGalleryImage(idx)
                                            }
                                            className="absolute top-1 right-1 rounded-full bg-red-600/80 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
                                        >
                                            <X className="size-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Roblox Image */}
                <div>
                    <label className={labelStyle}>Roblox Asset Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleRobloxImageChange}
                        disabled={isUploadingAny}
                        className={inputStyle}
                    />
                    {robloxImage && (
                        <div className="group relative mt-2 h-28 w-40 overflow-hidden rounded-lg border border-white/20">
                            <img
                                src={robloxImage.previewUrl}
                                alt="Roblox Preview"
                                className="h-full w-full object-cover"
                            />
                            {robloxImage.isUploading ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                                    <Loader2 className="size-6 animate-spin text-white" />
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleDeleteRobloxImage}
                                    className="absolute top-1 right-1 rounded-full bg-red-600/80 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
                                >
                                    <X className="size-4" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
                <Link
                    href={index()}
                    className="flex items-center justify-center gap-2 rounded-md border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-white/10"
                >
                    Cancel
                </Link>

                <button
                    type="submit"
                    disabled={processing || isUploadingAny}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-white bg-white px-4 py-2 text-sm font-medium text-black transition-colors duration-200 hover:bg-black hover:text-white disabled:opacity-50"
                >
                    {isUploadingAny ? (
                        <>
                            <Loader2 className="size-5 animate-spin" />
                            Uploading Images...
                        </>
                    ) : isEdit ? (
                        <>
                            <Save className="size-5 pb-0.5" />
                            Update Place
                        </>
                    ) : (
                        <>
                            <Plus className="size-5 pb-0.5" />
                            Add Place
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
