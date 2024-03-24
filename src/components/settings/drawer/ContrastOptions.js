import { RadioGroup } from '@mui/material';
import SvgColor from '../../svg-color';
import { useSettingsContext } from '../SettingsContext';
import { StyledCard, StyledWrap, MaskControl } from '../styles';
import { ICContrastBold } from '../../../assets/icons/setting/ic_contrast_bold';
import { ICContrast } from '../../../assets/icons/setting/ic_contrast';

const OPTIONS = ['default', 'bold'];

export default function ContrastOptions() {
  const { themeContrast, onChangeContrast } = useSettingsContext();

  return (
    <RadioGroup name="themeContrast" value={themeContrast} onChange={onChangeContrast}>
      <StyledWrap>
        {OPTIONS.map((contrast) => (
          <StyledCard key={contrast} selected={themeContrast === contrast}>

            {
              contrast === 'bold' ? <ICContrastBold /> : <ICContrast />
            }

            {/* <SvgColor
              src={`assets/icons/setting/${
                contrast === 'bold' ? ICContrastBold : 'ic_contrast'
              }.svg`}
            /> */}

            <MaskControl value={contrast} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  );
}
