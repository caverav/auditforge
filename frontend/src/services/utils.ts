import { t } from 'i18next';
import _ from 'lodash';

export default {
  htmlEncode: (html: string) => {
    if (typeof html !== 'string') {
      return '';
    }

    return html
      .replace(/[^\x20-\x7E]/g, '') // Non printable characters except NewLine
      .replace(/</g, 'ΩΠг')
      .replace(/>/g, 'ΏΠг')
      .replace(
        /ΩΠгimg.+?src="(.*?)".+?alt="(.*?)".*?ΏΠг/g,
        '<img src="$1" alt="$2">',
      )
      .replace(
        /ΩΠгlegend.+?label="(.*?)".+?alt="(.*?)".*?ΏΠг/g,
        '<legend label="$1" alt="$2">',
      )
      .replace(/ΩΠг\/legendΏΠг/g, '</legend>')
      .replace(
        /ΩΠгmark.+?data-color="(.*?)".+?style="(.*?)".*?ΏΠг/g,
        '<mark data-color="$1" style="$2">',
      )
      .replace(/ΩΠг\/markΏΠг/g, '</mark>')
      .replace(/ΩΠгpΏΠг/g, '<p>')
      .replace(/ΩΠг\/pΏΠг/g, '</p>')
      .replace(/ΩΠгpreΏΠг/g, '<pre>')
      .replace(/ΩΠг\/preΏΠг/g, '</pre>')
      .replace(/ΩΠгbΏΠг/g, '<b>')
      .replace(/ΩΠг\/bΏΠг/g, '</b>')
      .replace(/ΩΠгstrongΏΠг/g, '<strong>')
      .replace(/ΩΠг\/strongΏΠг/g, '</strong>')
      .replace(/ΩΠгiΏΠг/g, '<i>')
      .replace(/ΩΠг\/iΏΠг/g, '</i>')
      .replace(/ΩΠгemΏΠг/g, '<em>')
      .replace(/ΩΠг\/emΏΠг/g, '</em>')
      .replace(/ΩΠгuΏΠг/g, '<u>')
      .replace(/ΩΠг\/uΏΠг/g, '</u>')
      .replace(/ΩΠгsΏΠг/g, '<s>')
      .replace(/ΩΠг\/sΏΠг/g, '</s>')
      .replace(/ΩΠгstrikeΏΠг/g, '<strike>')
      .replace(/ΩΠг\/strikeΏΠг/g, '</strike>')
      .replace(/ΩΠгbrΏΠг/g, '<br>')
      .replace(/ΩΠгcodeΏΠг/g, '<code>')
      .replace(/ΩΠг\/codeΏΠг/g, '</code>')
      .replace(/ΩΠгulΏΠг/g, '<ul>')
      .replace(/ΩΠг\/ulΏΠг/g, '</ul>')
      .replace(/ΩΠгolΏΠг/g, '<ol>')
      .replace(/ΩΠг\/olΏΠг/g, '</ol>')
      .replace(/ΩΠгliΏΠг/g, '<li>')
      .replace(/ΩΠг\/liΏΠг/g, '</li>')
      .replace(/ΩΠгh1ΏΠг/g, '<h1>')
      .replace(/ΩΠг\/h1ΏΠг/g, '</h1>')
      .replace(/ΩΠгh2ΏΠг/g, '<h2>')
      .replace(/ΩΠг\/h2ΏΠг/g, '</h2>')
      .replace(/ΩΠгh3ΏΠг/g, '<h3>')
      .replace(/ΩΠг\/h3ΏΠг/g, '</h3>')
      .replace(/ΩΠгh4ΏΠг/g, '<h4>')
      .replace(/ΩΠг\/h4ΏΠг/g, '</h4>')
      .replace(/ΩΠгh5ΏΠг/g, '<h5>')
      .replace(/ΩΠг\/h5ΏΠг/g, '</h5>')
      .replace(/ΩΠгh6ΏΠг/g, '<h6>')
      .replace(/ΩΠг\/h6ΏΠг/g, '</h6>')
      .replace(/ΩΠг/g, '&lt;')
      .replace(/ΏΠг/g, '&gt;');
  },

  // Compress images to allow more storage in database since limit in a mongo document is 16MB
  resizeImg: (imageB64: string): Promise<string> =>
    new Promise((resolve, _) => {
      const oldSize = JSON.stringify(imageB64).length;
      const maxWidth = 1920;

      const img = new Image();
      img.src = imageB64;
      img.onload = () => {
        //scale the image and keep aspect ratio
        const resizeWidth = img.width > maxWidth ? maxWidth : img.width;
        const scaleFactor = resizeWidth / img.width;
        const resizeHeight = img.height * scaleFactor;

        // Create a temporary canvas to draw the downscaled image on.
        const canvas = document.createElement('canvas');
        canvas.width = resizeWidth;
        canvas.height = resizeHeight;

        //draw in canvas
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(imageB64);
          return;
        }
        ctx.drawImage(img, 0, 0, resizeWidth, resizeHeight);

        const result = canvas.toDataURL('image/jpeg');
        const newSize = JSON.stringify(result).length;
        if (newSize >= oldSize) {
          resolve(imageB64);
        } else {
          resolve(result);
        }
      };
    }),

  customFilter: (
    rows: Record<string, unknown>[],
    terms: Record<string, unknown>,
  ) => {
    return (
      rows &&
      rows.filter(row => {
        for (const [key, value] of Object.entries(terms)) {
          // for each search term
          let searchString = _.get(row, key) || '';
          if (typeof searchString === 'string') {
            searchString = searchString
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');
          }
          let termString = value || '';
          if (typeof termString === 'string') {
            termString = termString
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');
          }
          if (
            typeof searchString !== 'string' ||
            typeof termString !== 'string'
          ) {
            return searchString === termString;
          }
          if (
            typeof searchString === 'string' &&
            searchString.indexOf(termString) < 0
          ) {
            return false;
          }
        }
        return true;
      })
    );
  },

  normalizeString: (value: string): string =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''),

  AUDIT_VIEW_STATE: {
    EDIT: 0,
    EDIT_READONLY: 1,
    REVIEW: 2,
    REVIEW_EDITOR: 3,
    REVIEW_APPROVED: 4,
    REVIEW_ADMIN: 5,
    REVIEW_ADMIN_APPROVED: 6,
    REVIEW_READONLY: 7,
    APPROVED: 8,
    APPROVED_APPROVED: 9,
    APPROVED_READONLY: 10,
  },

  strongPassword: (value: string): boolean | string => {
    const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (regExp.test(value)) {
      return true;
    }
    return t('msg.passwordComplexity');
  },

  // Return black or white color depending on background color
  getTextColor: (bgColor: string): string => {
    const regex = /^#[0-9a-fA-F]{6}$/;
    if (!regex.test(bgColor)) {
      return '#000000';
    } //black

    const color = bgColor.substring(1, 7);
    const red = parseInt(color.substring(0, 2), 16); // hexToR
    const green = parseInt(color.substring(2, 4), 16); // hexToG
    const blue = parseInt(color.substring(4, 6), 16); // hexToB

    return red * 0.299 + green * 0.587 + blue * 0.114 > 186
      ? '#000000'
      : '#ffffff';
  },

  getRelativeDate: (date: string | Date): string => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();

    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }

    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    }

    const hours = Math.floor(diff / 3600000);
    if (hours < 24) {
      return `${hours} hours ago`;
    }

    const days = Math.floor(diff / 86400000);
    if (days < 30) {
      return `${days} days ago`;
    }

    const months = Math.floor(diff / 2592000000);
    if (months < 12) {
      return `${months} months ago`;
    }

    const years = Math.floor(diff / 31536000000);
    return `${years} years ago`;
  },

  bytesToHumanReadable: (bytes: number): string => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return '0 B';
    }
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = bytes / Math.pow(1024, i);
    return `${size.toFixed(2)} ${sizes[i]}`;
  },
};
