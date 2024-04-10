
import { Link } from 'react-router-dom';
import Avater from './Avater';

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}

const BlogsCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) => {
    const readingTime = calculateReadingTime(content);

    return (
        <Link to={`/blog/${id}`}>
        <div className='w-full flex justify-center mt-4 cursor-pointer'>
            <div className='w-5/6'>
                <div className="border border-gray-300 rounded p-2 mb-2 md:p-4 md:b-4">
                    <div className="flex justify-starts gap-2 md:gap-4 mb-2">
                        <Avater name={authorName} type="small" />
                        <span className="font-semibold text-xl md:text-2xl flex items-center justify-center">{authorName}.</span>
                        <span className=' flex items-end justify-center'>{publishedDate}</span>
                    </div>
                    <h2 className="text-2xl mt-1 md:text-3xl font-bold md:mt-4 mb-1">{title}</h2>
                    <p className="text-sm md:text-xl md:mb-2">{content.slice(0, 140)}...</p>
                    <div className="flex justify-start">
                        <span className="italic text-gray-500 mt-2">Reading Time: {readingTime}</span>
                    </div>
                </div>
            </div>
        </div>
        </Link>
    );
}

function calculateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTimeMinutes} ${readingTimeMinutes === 1 ? 'minute' : 'minutes'}`;
}

export default BlogsCard;
