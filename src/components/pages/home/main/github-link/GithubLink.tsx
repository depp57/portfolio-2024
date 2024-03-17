import ButtonCircle from '@/components/shared/button-circle';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export default function GithubLink() {
  return (
    <a href="https://github.com/depp57/portfolio-2024" target="_blank" rel="noopener">
      <ButtonCircle className="flex items-center justify-center">
        <GitHubLogoIcon width="26" height="26" className="text-primary-text" />
      </ButtonCircle>
    </a>
  );
}
